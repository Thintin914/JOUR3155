export const basicVertShader = `
attribute vec4 a_position;

void main() {
  gl_Position = a_position;
}
`;

export const basicImageVertShader = `
attribute vec2 a_position;
attribute vec2 a_texCoord;
uniform vec2 u_resolution;
varying vec2 v_texCoord;
void main() {
   // convert the rectangle from pixels to 0.0 to 1.0
   vec2 zeroToOne = a_position / u_resolution;
   // convert from 0->1 to 0->2
   vec2 zeroToTwo = zeroToOne * 2.0;
   // convert from 0->2 to -1->+1 (clipspace)
   vec2 clipSpace = zeroToTwo - 1.0;
   gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
   // pass the texCoord to the fragment shader
   // The GPU will interpolate this value between points.
   v_texCoord = a_texCoord;
}
`;

export const waveFragShader = `
precision highp float;

uniform vec2 resolution;
uniform float time;
uniform vec3 color;

uniform vec2 mouse;

void main() {

  vec2 coord = (gl_FragCoord.xy / resolution.xy / 2.0) + mouse.y;

  float val = sin(time * coord.x);

  if (coord.y > val){
    gl_FragColor = vec4(color.rgb, 1.0);
  }else{
    gl_FragColor = vec4(1.0);
  }
}
`;

export const slowWaveFragShader = `
precision highp float;

uniform vec2 resolution;
uniform float time;
uniform vec3 color;

void main() {

  vec2 coord = (gl_FragCoord.xy / resolution.xy) + 0.65;
  float val = sin(time / mod(coord.x, 10.0));

  if (coord.y >= val){
    gl_FragColor = vec4(color.rgb, 1.0);
  }else{
    gl_FragColor = vec4(0.0);
  }
}
`;

export const diagonalFragShader = `
precision lowp float;

uniform float scale;
uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

// our textures
uniform sampler2D u_image0;
uniform sampler2D u_image1;

varying vec2 v_texCoord;

uniform vec3 c;
uniform float amount;

void main() {
    
  vec4 color = texture2D(u_image0, mod(vec2((v_texCoord.x - sin(time)) * amount, (v_texCoord.y - cos(time)) * scale * amount), 1.0));

  vec2 localPos = vec2(gl_FragCoord.x / (resolution.x * scale), gl_FragCoord.y);

  float dist = distance(vec2(localPos.x, localPos.y * scale), vec2(gl_FragCoord.x, gl_FragCoord.y * scale));

  if (dist <= 50.0 + abs(sin(time * 5.0) * 80.0)){
    vec4 color2 = texture2D(u_image1, mod(vec2((v_texCoord.x - sin(time)) * amount, (v_texCoord.y - cos(time)) * scale * amount), 1.0));
    if (color2.a == 0.0){
      gl_FragColor = vec4(c.r + sin(time) * 0.3, c.gb, 1.0);
    }else{
      gl_FragColor = vec4(vec3(sin(time) * 0.3), 1.0);
    }
  }else{
    if (color.a == 0.0){
        gl_FragColor = vec4(0.0);
    }else{
        gl_FragColor = vec4(c.r + sin(time) * 0.2, c.g, c.b, 1.0);
    }
  }
}
`;

export const distortionFragShader = `
precision lowp float;

uniform sampler2D u_image0;

uniform float scale;
uniform vec2 resolution;
uniform float time;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

void main() {

  vec2 pos = mod(vec2(10.0 * v_texCoord.x, 10.0 * v_texCoord.y) + sin(v_texCoord.x * 10.0 + time) + cos(v_texCoord.y * 10.0 + time), smoothstep(1.0, 2.0, v_texCoord.xy + 1.5));
  pos = vec2(pos.x / scale, pos.y / scale);
  vec4 pixel = texture2D(u_image0, pos);

  gl_FragColor = vec4(pixel.rgba);
}
`;

export const distortionFragShader2 = `
precision lowp float;

uniform float scale;
uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

float colormap_red(float x) {
  if (x < 0.0) {
      return 15.0 / 255.0;
  } else if (x < 20049.0 / 82979.0) {
      return (500.0 * x + 30.0) / 255.0;
  } else {
      return 0.3;
  }
}

float colormap_green(float x) {
  
  if (x < 20049.0 / 82979.0) {
      return 0.0;
  } else if (x < 327013.0 / 810990.0) {
      return (8546482679670.0 / 10875673217.0 * x - 2064961390770.0 / 10875673217.0) / 255.0;
  } else if (x <= 1.0) {
      return (103806720.0 / 483977.0 * x + 19607415.0 / 483977.0) / 255.0;
  } else {
      return 1.0;
  }
}

float colormap_blue(float x) {
  if (x < 0.0) {
      return 80.0 / 255.0;
  } else if (x < 7249.0 / 82979.0) {
      return (829.79 * x + 54.51) / 255.0;
  } else if (x < 20049.0 / 82979.0) {
      return 127.0 / 255.0;
  } else if (x < 327013.0 / 810990.0) {
      return (792.02249341361393720147485376583 * x - 64.364790735602331034989206222672) / 255.0;
  } else {
      return 1.0;
  }
}

vec4 colormap(float x) {
  return vec4(colormap_red(x), colormap_green(x), colormap_blue(x), 1.0);
}

float rand(vec2 n) { 
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p){
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u*u*(3.0-2.0*u);

  float res = mix(
      mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
      mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
  return res*res;
}

const mat2 mtx = mat2( 0.80,  0.60, -0.60,  0.80 );

float fbm( vec2 p )
{
  float f = 0.0;

  f += 0.500000*noise( p + time  ); p = mtx*p*2.02;
  f += 0.031250*noise( p ); p = mtx*p*2.01;
  f += 0.250000*noise( p ); p = mtx*p*2.03;
  f += 0.125000*noise( p ); p = mtx*p*2.01;
  f += 0.062500*noise( p ); p = mtx*p*2.04;
  f += 0.015625*noise( p + sin(time) );

  return f/0.96875;
}

float pattern( vec2 p )
{
return fbm( p + fbm( p + fbm( p ) ) );
}

void main()
{
  vec2 uv = gl_FragCoord.xy / resolution.x;
  float shade = pattern(uv);

  float temp = -distance(mouse.xy, uv.xy) * 0.4;

  if (temp > -0.6){
    shade += temp;
  }

  gl_FragColor = vec4(colormap(shade).rgb, 1.0);
}

`;

export const cityscapeFragShader = `
precision lowp float;

uniform sampler2D u_image0;

uniform float scale;
uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

uniform vec2 scroll;

// the texCoords passed in from the vertex shader.
varying vec2 v_texCoord;

uniform vec2 parallex;
uniform float scrollRate;

void main(){

  float s = scroll.y / resolution.y / scrollRate;

  vec2 pos = vec2(v_texCoord.x, mod(v_texCoord.y + s * 0.5, smoothstep(0.0, 0.6, v_texCoord.y)) );

  pos = vec2(pos.x + (mouse.x - 0.5) * parallex.x, pos.y - (mouse.y - 0.5) * parallex.y);

  if (resolution.x > resolution.y){
    pos = vec2(pos.x, pos.y * scale);
  } else {
    pos = vec2(pos.x * scale, pos.y);
  }

  vec4 color = texture2D(u_image0, pos);

  float ss = min(s / 2.0, 0.6);

  color = vec4(color.r * (1.0 - ss), color.g * (1.0 - ss), color.b * (1.0 - ss), 1.0);

  float a = 1.0;
  if (color.r == 0.0 && color.g == 0.0 && color.b == 0.0){
    a = 0.0;
  }

  gl_FragColor = vec4(color.rgb, a);
}
`;

export const gradientCircleFragShader = `
precision lowp float;

uniform float scale;
uniform vec2 resolution;
uniform float time;

uniform vec3 val;

uniform float baseRadius;

float variation(vec2 v1, vec2 v2, float strength, float speed) {
return sin(
      dot(normalize(v1), normalize(v2)) * strength + time * speed
  ) / 100.0;
}

vec4 paintCircle (vec2 uv, vec2 center, float rad, float width) {
  
  vec2 diff = center-uv;
  float len = length(diff);

  len += variation(diff, vec2(0.0, 1.0), 5.0, 1.0);
  len -= variation(diff, vec2(1.0, 0.0), 5.0, 1.0);
  
  float circle = 1.0 - smoothstep(rad, rad+width, len);

  return vec4(circle * val.r, circle * val.g, circle * val.b, circle);
}


void main(){
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  
  vec4 color;
  float radius = (baseRadius / 2.0) + abs(cos(time * 0.1) * baseRadius);
  vec2 center = vec2(0.5);
  
  color = paintCircle(uv, center, radius, 0.3);

  gl_FragColor = vec4(color);
}
`;

export const faintLightFragShader = `
precision lowp float;

uniform vec2 resolution;
uniform float time;

void main(){
	vec3 c = vec3(1.0);
	float l = 1.0;
  float z = time;
	for(int i=0;i<3;i++) {
		vec2 uv = vec2(0.0);
    vec2 p = gl_FragCoord.xy/resolution.xy;
		uv=p;
		p-=.5;
		p.x*=resolution.x/resolution.y;
		z+=.15;
		l=length(p);
		uv+=p/l*(sin(z)+1.)*abs(sin(l*9.-z-z));
		c[i]=.01/length(mod(uv,1.)-.5);
	}
	gl_FragColor = vec4(c.x/l, c.y/l, c.z/l, time);

}
`;

export const halfToneFragShader = `
precision lowp float;

uniform float scale;
uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;

#define DOTSIZE 0.5
#define D2R(d) radians(d)
#define MIN_S 1.5
#define MAX_S 1.8
#define SPEED 0.01

#define SST 0.188
#define SSQ 0.08

#define ORIGIN (0.5 * resolution.xy)
float R;
float S;

vec4 rgb2cmyki(vec3 c)
{
	float k = max(max(c.r, c.g), c.b);
	return min(vec4(c.rgb / k, k), 1.0);
}

vec3 cmyki2rgb(vec4 c)
{
	return c.rgb * c.a;
}

vec2 px2uv(vec2 px)
{
	return vec2(px / resolution.xy);
}

vec2 grid(vec2 px)
{
	return px - mod(px,S);
}

vec4 ss(vec4 v)
{
	return smoothstep(SST-SSQ, SST+SSQ, v);
}

vec4 halftone(vec2 fc, mat2 m)
{
	vec2 smp = (grid(m*fc) + 0.5*S) * m;
	float s = min(length(fc-smp) / (DOTSIZE*0.5*S), 1.0);
    vec3 texc = vec3(0.0);
    texc = pow(texc, vec3(2.2)); // Gamma decode.
	vec4 c = rgb2cmyki(texc);
	return c+s;
}

mat2 rotm(float r)
{
	float cr = cos(r);
	float sr = sin(r);
	return mat2(
		cr,-sr,
		sr,cr
	);
}

void main()
{
    R = SPEED*0.333*time;
    S = MIN_S + (MAX_S-MIN_S) * (0.5 - 0.5*cos(SPEED*time));

	vec2 fc = gl_FragCoord.xy - ORIGIN;
	
	mat2 mc = rotm(R + D2R(15.0));
	mat2 mm = rotm(R + D2R(75.0));
	mat2 my = rotm(R);
	mat2 mk = rotm(R + D2R(10.0));
	
	float k = halftone(fc, mk).a;
	vec3 c = cmyki2rgb(ss(vec4(
		halftone(fc, mc).r,
		halftone(fc, mm).g,
		halftone(fc, my).b,
		halftone(fc, mk).a
	)));
    
  c = pow(c, vec3(1.0/5.2)); // Gamma encode.
  float a = 1.0;
  if (c.r == 1.0 || c.g == 1.0 || c.b == 1.0){
    c = c * -1.0;
    a = 0.0;
  }
	gl_FragColor = vec4(c, a);

}
`;