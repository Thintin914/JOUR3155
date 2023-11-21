import React, { useEffect, useState } from 'react';
import { CanvasBlock } from './utils/glsl/CanvasBlock';
import { Sector1 } from './Sector1';
import { createHalfToneShader } from './utils/glsl/halfToneShader';
import { Quote } from './Quote';
import { Quote2 } from './Quote2';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { LabourForce } from './LabourForceChart';
import { TTPSPieChart } from './TTPSPieChart';
import TTPSCountryCaseChart from './TTPSCountryCaseChart';

function App() {

  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [mousePos, setMousePos] = useState<{x: number, y: number}>({x: 0, y: 0});
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() =>{

    createHalfToneShader('gl1', 0.005);
    const onresize = () =>{
      setScreenWidth(window.innerWidth);
    };

    const onmove = (e: MouseEvent) =>{
      setMousePos({
        x: e.x,
        y: e.y
      })
    }

    const onscroll = () =>{
      setScrollY(window.scrollY)
    }

    window.addEventListener('resize', onresize);
    window.addEventListener('mousemove', onmove);
    window.addEventListener('scroll', onscroll);
    onresize();

    return () =>{
      window.removeEventListener('resize', onresize);
      window.removeEventListener('mousemove', onmove);
      window.removeEventListener('scroll', onscroll);
    }
  }, [])

  return (
    <div className=' relative w-full h-fit overflow-clip font-serif text-[#282b2e]'>

      <div className=' absolute w-full h-[80vh] -z-40'>
        <CanvasBlock id='gl1' canvasH={1000} canvasW={1000} />
      </div>

      <div className=' fixed right-0 -z-50'
        style={{
          display: screenWidth < 768 ? 'none' : 'block'
        }}>
        <img src='./images/ink.png' className=' contain' />
      </div>

      <div className=' relative w-full h-[20vh] flex flex-col justify-center items-center font-sans'>

        <div className="bg-fixed w-full h-full bg-cover absolute opacity-40 -z-50"
          style={{
            backgroundImage: 'url(./images/crowd.png)'
          }}
        />
      </div>

      <div className='w-full h-[10vh] relative'>
        <div className="bg-fixed w-full h-full bg-cover absolute opacity-30 -z-50"
          style={{
            backgroundImage: 'url(./images/newspaper.jpeg)'
          }}
        />
      </div>

      <div className=' flex flex-col justify-start items-start mt-5 ml-12 mr-12 md:mr-[300px] gap-8 text-2xl font-thin'
        style={{
          lineHeight: '2.5rem'
        }}>

        <div className=' w-full flex flex-col justify-start items-start text-lg'
          style={{
            lineHeight: '1.8rem'
          }}>
          <p className=' text-5xl font-bold'>Headline (TBC)</p>

          <div className=' w-full flex justify-between items-center'>
            <p className=' text-gray-400'>Reported by Vincent Chan, Fanny Cheung, Joyce Chu, Jacky Wu</p>
            <p className=' text-gray-400'>7 Nov, 2023</p>
          </div>

          <div className='w-full flex justify-center items-center'>
            <img src='./images/cover.jpeg' className='contain'  />
          </div>
          <p className='text-lg text-center'>Causeway Bay, Hong Kong’s business district on the Friday’s afternoon, Nov. 17, 2023.</p>
        </div>

        <p>The Hong Kong government opened the applications for the Top Talent Pass Scheme (SPSS) in December 2022, William Wong, the director of iN and iN Management Limited, expected that the programme would be able to relax the talent shortage in the IT industry, whilst the result has not been as he expected.</p>
        <p>Wong’s company has seen a rise of about 10% in the number of applicants in the past six months most of whom are mainlanders who came to Hong Kong through the TPPS.</p>
        <p>We do get a lot of applications from people who have TTPS visas, and we have hired a lot of them, but they don't stay in their jobs or Hong Kong for long,</p>
        <p>Wong believed the company was now competitive enough to take on more commercial projects by hiring non-local talents, but the effectiveness of bridging the talent gap, in the long run, had yet to be ascertained. </p>
        <p>The Legislative Council member, Kong Yuk-foon, stated the decision of TTPS applicants to stay in Hong Kong or not would affect the effectiveness of the programme and local employment, and the government should review whether the number of people coming to work in Hong Kong and their occupations could meet the Government's expectation after the programme had been implemented for one to two years.</p>
        <p>The local labor force has dropped 5.3% from 3.99 million in 2019 to 3.77 million in 2022, hitting a new low since the immigration wave and the COVID-19 pandemic, according to the Census and Statistics Department.</p>
      
        <div className='w-full flex justify-center items-center'>
          <video className='w-full lg:w-1/2 aspect-video' controls>
            <source src="./images/video.mp4" type="video/mp4"/>
            our browser does not support the video tag.
          </video>
        </div>

        <div className='w-full flex flex-col justify-start items-start bg-slate-50 p-1'>
          <p className='flex w-full justify-center items-center text-center font-semibold'
            style={{
              lineHeight: '1.5rem'
            }}>
            2019 Q1 - 2023 Q3 Hong Kong's Labour Force
          </p>
          <LabourForce width={screenWidth > 768 ? screenWidth - screenWidth * 0.25 : screenWidth - screenWidth * 0.1} />
          <p className='text-lg text-center'>Hong Kong's labour force edges up 1.7% in the third quarter of 2023 compared with the first quarter of 2022, which the first quarter after the introduction of TTPS application.</p>
        </div>
        

        <p>TTPS is a new talent program introduced by the Hong Kong Government in the Policy Address 2022, to attract high-paid and well-qualified world talents to stay in Hong Kong, thereby strengthening the high-end labor force and enhancing competitiveness.</p>
        <p>The government aims to attract high-net-value talents with Category A targets on experienced and high-income employees or entrepreneurs with an annual income reached HK$2.5 million equivalent in the year before application.</p>
        <p>Category B and C applicants are required to hold a bachelor’s degree from the world’s top 100 universities. Category B applicants are required to have at least three years of working experience, while no working experience is required for Category C applicants, but it is subject to a quota limit and is available on a first-come-first-served basis.</p>
        
        <p>As of Oct. 31, 2023, the number of successful applications for the TTPS reached 43,068 out of 54,772 cases, accounting for 37.2% of the total number of all talent schemes’ approvals, with 94.5% of approved applicants from Mainland China. </p>
        <p>Category A, B, and C applications each accounted for 22.6%, 54.5%, and 22.8% of the approved applications, respectively, according to the Labour and Welfare Bureau. </p>
        <p>The more relaxed eligibility criteria for Category C have attracted many applicants of Chinese nationality who obtained their bachelor’s degree from the world’s top 100 universities with less than three years of work experience.</p>
        <p>After the launch of TTPS last year, the labor force edged up 1.7% that returned to 3.83 million as of September 2023, according to the Census and Statistics Department.</p>
        
        <div className=' w-full h-fit flex flex-col lg:flex-row justify-start items-start gap-2'>

          <div className='w-full lg:w-1/2 flex flex-col justify-start items-start bg-slate-50 p-1'>
            <p className='flex w-full justify-center items-center text-center font-semibold'
              style={{
                lineHeight: '1.5rem'
              }}>
              TTPS Category Disturbution of Application as of Oct. 12, 2023
            </p>
            <TTPSPieChart width={screenWidth > 768 ? screenWidth - screenWidth * 0.12 : screenWidth - screenWidth * 0.05}  />
            <p className='text-lg text-center min-h-[10vh]'>The number of Category B applicants, graduates from the world’s top 100 university with at least three years of work experience, ranks top among three categories under TTPS.  </p>
          </div>

          <div className='w-full lg:w-1/2 flex flex-col justify-start items-start bg-slate-50 p-1'>
            <p className='flex w-full justify-center items-center text-center font-semibold'
              style={{
                lineHeight: '1.5rem'
              }}>
              TTPS Country Disturbution of Approved Cases as of Oct. 31, 2023
            </p>
            <TTPSCountryCaseChart width={screenWidth > 768 ? screenWidth - screenWidth * 0.12 : screenWidth - screenWidth * 0.05}  />
            <p className='text-lg text-center min-h-[10vh]'>TTPS applicants from China counts for most of the approved cases.</p>
          </div>

        </div>
        


        <p>As the programme has no mandatory requirement for applicants to work in Hong Kong, some applicants admitted that they had no intention to come to Hong Kong recently as they applied for TTPS just to "give it a try" and leave more options for their future career development.</p>

        <div className=' w-full flex justify-center items-center'>
          <div className='w-full lg:w-[70%] aspect-video'>
            <Splide
              options={{
                perPage: 1,
                autoplay: true,
                interval: 4000,
                type: 'loop',
                flickPower: 100,
                perMove: 1,
                pauseOnFocus: false,
                pauseOnHover: true,
                pagination: false
              }}>
              <SplideSlide>
                <div className=' relative w-full flex flex-col justify-start items-start'>
                  <img src="./images/Zeng.jpg" className=' contain'/>
                  <p className=' absolute bottom-0 w-full bg-zinc-900 bg-opacity-40 text-lg text-white'>TTPS Category C applicants, Zeng Jia, 24, a fresh graduate from Monash University, Australia, is currently working in mainland China. (Picture provided by Zeng Jia)</p>
                </div>
              </SplideSlide>
              <SplideSlide>
                <div className=' relative w-full flex flex-col justify-start items-start'>
                  <img src="./images/Lei.jpg" className=' contain'/>
                  <p className=' absolute bottom-0 w-full bg-zinc-900 bg-opacity-40 text-lg text-white'>TTPS Category C applicants, Lei Zhiqin, 26, receives her bachelor’s and master’s degree in architecture from Tsinghua University, China, and plans to establish a design studio in Hong Kong in the future. (Picture provided by Lei Zhiqin)</p>
                </div>
              </SplideSlide>
              <SplideSlide>
                <div className=' relative w-full flex flex-col justify-start items-start'>
                  <img src="./images/Li.jpg" className=' contain'/>
                  <p className=' absolute bottom-0 w-full bg-zinc-900 bg-opacity-40 text-lg text-white'>TTPS Category C applicants, Li Yuehan, 23, a graduate from Fudan University, China, is currently pursuing a master's degree oversea with no plans to in the coming year. (Picture provided by Li Yuehan)</p>
                </div>
              </SplideSlide>
            </Splide>
          </div>
        </div>

        <p>Zheng Jia, 24, a fresh graduate of Monash University, applied for TTPS Category C and received her notification of approval in early June this year.</p>
        <p>The original mechanism for entry into Hong Kong, for example, the Quality Migrant Admission Scheme, uses a points system. As a university graduate with no assets, I cannot gain enough points for entry into Hong Kong. However, TTPS only requires a degree from a top 100 university,</p>

        <p>Li Yuehan, 23, a Category C applicant who got her bachelor’s degree from Fudan University, agreed the TPPS has opened up a path for eligible students from different disciplines to easily enter the Hong Kong labor market without having to find a job.</p>
        <p>"As a Category C applicant, I am only required to submission graduation certificates, transcripts, Exit-Entry Permit for Travelling to and from Hong Kong and Macao (EEP), and other personal information and documents," said Lei Zhiqin, a 26-year-old architect who graduated from Tsinghua University who got her TTPS Visa in September."</p>
        <p>Ren Jieting, 37, a category A applicant who lives with his wife and 10-year-old child in Beijing, agreed that the application procedure compared to another talent scheme as he spent less than a month walking through the whole process.</p>
        <p>Processing time of application for a visa permit under TTPS takes four weeks after the submission of all required documents, according to the Immigration Department, whilst applicants have had their successful applications adjudicated within one to three weeks.</p>
        <p>"The quality of the applicants is quite varying sometimes because there is a requirement gap between Category A, B, and C,” said Wong. “We hope the government will carefully screen the applications and follow up the post-approval situation of the applicants to ensure the effective admission of talents.”</p>
        <p>As the economic downturn in mainland China, Category C applicants are mostly fresh graduates with less working experience who favor Hong Kong as a city with stable economic development and a broader platform for job search.</p>
        <p>Zeng stated the financial industry is currently under suppression in mainland China, and coupled with the deterioration of the China economy, she sees Hong Kong with more job opportunities, which pushed her to apply to TTPS.</p>
        <p>Li also believed that Hong Kong's financial industry still enjoys an edge, which encouraged some of her classmates majoring in finance to apply for TPPS to enter Hong Kong and seek job opportunities.</p>
        <p>Besides more job opportunities, there is more room for business development in Hong Kong, and the lower tax rate helps start a company as I want to establish my studio in Hong Kong as well,</p>
        <p>Under the low tax rate practice in Hong Kong, corporations with annual profits not exceeding HK$2 million are required to pay profits tax at 8.25%, while those with annual profits exceeding HK$2 million are required to pay profits tax at 16.5%.</p>
        <p>Applicants’ legal spouses and unmarried dependent children under 18 are allowed to enter Hong Kong under TTPS, some of the applicants in Category A and B that she knew, value the Hong Kong education system, which planned to bring their children to study here, Lei added.</p>
        <p>“I fancy Hong Kong's economic development, welfare, and education,” said Ren, “Compared with other countries, I feel that Hong Kong's cultural background and location advantage of easy access to mainland China are more suitable for our family.”</p>
        <p>The government introduced a stamp duty refund mechanism for TTPS individuals who are eligible for exemption of buyer's stamp duty (BSD) and ad valorem stamp duty (AVD) to attract talents to settle in Hong Kong.</p>
        <p>Zeng, Li, Lei, and Ren said the existing complementary policies of the government are unable to attract talents of TTPS to settle in Hong Kong.</p>
        <p>“The cost of living in Hong Kong is much higher than in mainland China. If the government does not have relevant policies to support talents coming to Hong Kong, likely, they will eventually return to mainland China after years,” added Zeng.</p>
        <p>Zeng suggested the government could set up employment support services for talents coming to Hong Kong through TTPS, such as cooperating with enterprises to provide employment opportunities, while Lei agreed if the government introduce preferential treatment to foreign investors to set up a business in Hong Kong would be attractive to potential talents.</p>
        <p>Given the limited social resources and unclear effectiveness of the TTPS, it is not appropriate for the government to introduce complementary measures and benefits to attract more applicants at this stage, said Kong.</p>
        <p>Applicants for the TTPS should not only think about the welfare of Hong Kong as they have high academic qualifications and rich working experience, which means they should have the ability to live in Hong Kong,</p>
        <p>Focusing on the difficulties encountered by TTPS applicants in finding jobs, Kong suggested that the government examine whether talents of certain job types and occupations are unsuitable for importation into Hong Kong in the future policy review, to better meet the demand of the local labour market. </p>
        <p>After a year the announcement of TTPS, the government released to expand the university network under TTPS by adding eight top-notch institutions to 184 institutions in total, including five overseas world-tier hospitality and leisure management universities or schools and three universities in mainland China that are listed in Project 985, which effect from this month in Policy Address 2023.</p>
        <p>Kong said that there is no need to make extensive changes to TTPS now as there is a continued need for continuity and the government should avoid any disruptions caused by the changes before the results can be seen, while there is need the government to conduct a transparent review of the effectiveness of the programme in the next one to two years.</p>
        <p>Kong reiterated the programme did not cater to Mainlanders only but was comprehensively geared towards global talents.</p>
        <p>“With foreign chambers of commerce re-launching their local operations, we expect to see more young, educated, and experienced applicants from all over the world for our programme in the coming years,” added Kong.</p>
      </div>

      <div className='w-full h-[10vh] relative mt-[20vh]'>
        <div className="bg-fixed w-full h-full bg-cover absolute opacity-30 -z-50"
          style={{
            backgroundImage: 'url(./images/newspaper.jpeg)'
          }}
        />
      </div>
      <div className=' w-full h-[30vh] bg-zinc-900 flex justify-center items-center text-white font-mono'> 
          <p>End of Reading</p>
      </div>

    </div>
  );
}

export default App;
