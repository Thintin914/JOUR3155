import React, { useEffect, useState } from 'react';
import { CanvasBlock } from './utils/glsl/CanvasBlock';
import { createFaintLightShader } from './utils/glsl/faintLightShader';
import { motion } from 'framer-motion';
import { Sector1 } from './Sector1';

function App() {

  const [screenWidth, setScreenWidth] = useState<number>(0);
  const [mousePos, setMousePos] = useState<{x: number, y: number}>({x: 0, y: 0});
  const [scrollY, setScrollY] = useState<number>(0);

  useEffect(() =>{

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
    <div className=' w-full h-fit overflow-clip font-serif text-[#282b2e]'>
      <div className=' relative w-full h-[130vh] flex flex-col justify-center items-center font-sans'>

        <div className="bg-fixed w-full h-full bg-cover absolute opacity-40 -z-50"
          style={{
            backgroundImage: 'url(./images/crowd.png)'
          }}
        />

        <p className=' absolute text-4xl md:text-8xl opacity-40 font-light text-center md:font-thin text-outline-black-3'
          style={{
            transform: `translate(${mousePos.x / 20}px, ${mousePos.y / 20}px)`
          }}>
          高端人才通行證計劃
        </p>
        <p className=' absolute text-[#141414] text-4xl md:text-8xl opacity-60 font-light text-center md:font-thin text-outline-black-3'
          style={{
            transform: `translate(${mousePos.x / -10}px, ${mousePos.y / -10}px)`
          }}>
          The Top Talent Pass Scheme
        </p>

      </div>

      <Sector1 width={screenWidth} height={20} top={-75} scrollY={scrollY} title='Published By' contents={[ 'Fanny', 'Joyce', 'Jacky', 'Vincent', 'at 7 Nov, 2023']} />

      <div className=' flex flex-col justify-start items-start ml-16 mr-60 gap-8 text-2xl font-thin text-justify'>
        <p className=' font-bold text-5xl'>Introduction</p>
        <p>The Top Talent Pass Scheme (TTPS), aiming to attract the world's top talents with working experience, high salaries, and high academic qualifications to Hong Kong, has sparked a debate over its effectiveness since the launch of the first batch of applications on Dec. 28, 2022.</p>
        <p>The Director of iN and iN Management Limited William Wong, is positive that talents could fill up the manpower shortage faced in specific industries in Hong Kong.</p>
        <p>“We are facing a lack of local talents, but if we could bring in talents from all over the world, it will definitely help our labor market with increased talent supply,” said Wong. </p>
        <p>TTPS is a new talent program introduced by the Hong Kong Government in the Policy Address 2022, with the aim of attracting high-paid and well-qualified world talents to stay in Hong Kong, thereby strengthening the high-end labor force and enhancing competitiveness.</p>
        <p>The government aims to attract high-net-value talents with Category A targets on experienced and high-income employees or entrepreneurs with an annual income reached HK$2.5 million equivalent in the year prior to application.</p>
        <p>Category B and C applicants are required to hold a bachelor’s degree from the world’s top 100 universities. Category B applicants are required to have at least three years of working experience, while no working experience is required for Category C applicants, but it is subject to a quota limit and is available on a first-come-first-served basis.</p>
        <p>The local labor force has dropped 5.3% from 3.99 million in 2019 to 3.77 million in 2022, hitting a new low since the immigration wave.</p>
        <p>After the launch of TTPS last year, the labor force edged up 1.7% that returned to 3.83 million as of September 2023, according to the Census and Statistics Department.</p>
        <p>Wong’s company has benefited from the TTPS his company is now competitive enough to undertake more commercial projects by hiring non-local talents to fill the labor gap and increase the company’s productivity.</p>
        <p>“After the launch of TTPS, we received are much more job applications from mainland or overseas talents than what we used to have, at least 10% more,” said Wong.</p>
        <p>As of MM/YYYY, the number of applicants for the TTPS reached XX, of which XX% were from Mainland China. A total of XX applications were approved, accounting for XX% of the total number of applications under the talent schemes in Hong Kong, according to the Immigration Department.</p>
        <p>Category A, B, and C applications each accounted for XX%, XX%, and XX% of the approved applications, respectively.</p>
        <p>The more relaxed eligibility criteria for Category C have attracted many applicants of Chinese nationality who obtained their bachelor’s degree from the world’s top 100 universities with less than three years of work experience.</p>
        <p>Zheng Jia, 24, a fresh graduate of Monash University, applied for TTPS Category C and received her notification of approval in early June this year.</p>
        <p>“The original mechanism for entry into Hong Kong, for example, the Quality Migrant Admission Scheme (QMAS), uses a points system. As a university graduate with no assets, I cannot gain enough points for entry into Hong Kong,” said Zheng. “However, TTPS only requires a degree from a top 100 university.”</p>
        <p>Li Yuehan, 23, a Category C applicant who got her bachelor’s degree from Fudan University, agreed the TPPS has opened up a path for eligible students from different disciplines to easily enter the Hong Kong labor market without having to find a job.</p>
        <p>“As a Category C applicant, I am only required to submission graduation certificates, transcripts, Exit-Entry Permit for Travelling to and from Hong Kong and Macao (EEP), and other personal information and documents,” said Lei Zhiqin, a 26-year-old architect who graduated from Tsinghua University who got her TTPS Visa in September.</p>
        <p>Processing time of application for a visa permit under TTPS takes four weeks after the submission of all required documents, according to the Immigration Department, whilst Category C applicants have had their successful applications adjudicated within one to three weeks.</p>
        <p>“The quality of the applicants is quite varying sometimes because there is a requirement gap between Category A, B, and C,” said Wong. “We hope the government will carefully screen the applications and follow up the post-approval situation of the applicants to ensure the effective admission of talents.”</p>
        <p>As the economic downturn in mainland China, Category C applicants are mostly fresh graduates with less working experience who favor Hong Kong as a city with stable economic development and a broader platform for job search.</p>
        <p>Zeng stated the financial industry is currently under suppression in mainland China, and coupled with the deterioration of the China economy, she sees Hong Kong with more job opportunities, which pushed her to apply to TTPS.</p>
        <p>Li also believed that Hong Kong's financial industry still enjoys an edge, which encouraged some of her classmates majoring in finance to apply for TPPS to enter Hong Kong and seek job opportunities.</p>
        <p>“Besides more job opportunities, there is more room for business development in Hong Kong, and the lower tax rate is helpful in starting a company as I want to establish my studio in Hong Kong as well,” said Lei.</p>
        <p>Under the low tax rate practice in Hong Kong, corporations with annual profits not exceeding HK$2 million are required to pay profits tax at 8.25%, while those with annual profits exceeding HK$2 million are required to pay profits tax at 16.5%.</p>
        <p>Applicants’ legal spouses and unmarried dependent children under 18 are allowed to enter Hong Kong under TTPS, some of the applicants in Category A and B knew to value the Hong Kong education system, which planned to bring their children to study here, Lei added.</p>
        <p>The government introduced a stamp duty refund mechanism for TTPS individuals who are eligible for exemption of buyer's stamp duty (BSD) and ad valorem stamp duty (AVD) in order to attract talents to settle in Hong Kong.</p>
        <p>Zeng, Li, and Lei said the existing complementary policies of the government are unable to attract them to settle in Hong Kong.</p>
        <p>“The cost of living in Hong Kong is much higher than in mainland China. If the government does not have relevant policies to support talents coming to Hong Kong, it is very likely that they will eventually return to mainland China after years,” added Zeng.</p>
        <p>Zeng suggested the government could set up employment support services for talents coming to Hong Kong through TTPS, such as cooperating with enterprises to provide employment opportunities, while Lei agreed if the government introduce preferential treatment to foreign investors to set up a business in Hong Kong would be attractive to potential talents.</p>
        <p>Zeng, Li, and Lei said that they applied for TTPS just to "give it a try" and leave more options for their future career development. </p>
        <p>Although they were granted visas, they are still torn as to whether they will come to Hong Kong to work or renew their visas after two years.</p>
        <p>After a year the announcement of TTPS, the government released to expand the university network under TTPS by adding eight top-notch institutions to 184 institutions in total, including five overseas world-tier hospitality and leisure management universities or schools and three universities in mainland China that are listed in Project 985, which effect from this month in Policy Address 2023.</p>
      </div>

    </div>
  );
}

export default App;
