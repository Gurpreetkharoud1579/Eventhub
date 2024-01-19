import harman from '../assets/pictures/harman.png'
import rahul from '../assets/pictures/rahul.png'
import gurpreet from '../assets/pictures/gurpreet.png'

const About = () => {

    return (
        <>
            <div class="flex justify-center  p-4">

                <div class="flex flex-col justify-center items-center ">
                    <header className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-8">
                        <h1 className="text-4xl font-bold">
                            <div class="text-white text-3xl md:text-5xl font-medium ">About Co-Founders</div>
                            <div class="text-white text-xl  font-medium">Know all about the Founders.</div>
                        </h1>
                    </header>

                    <div class="text-white my-4 md:font-medium text-center w-1/2">Are you planning a memorable event that deserves an extraordinary touch? Look no further! EventHub is your premier destination for all things event planning and organization.

                        At EventHub, we're dedicated to transforming your vision into a stunning reality. Whether you're planning a corporate conference, a dreamy wedding, a lively birthday bash, a community fundraiser, or any special occasion, our platform is designed to simplify the entire process for you.</div>
                    <div class="flex flex-col md:flex-row max-w-10xl gap-2 justify-center items-center ">


                        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
                            <a href="#">
                                <img class="rounded-t-lg object-cover h-[300px] w-full" src={harman} alt="" />
                            </a>
                            <div class="p-5">
                                <a href="#">
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Harmanpreet Singh</h5>
                                </a>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">I had the pleasure of working with Harmanpreet as a frontend developer, and I can't say enough about their exceptional skills and dedication to our projects. Harmanpreet is a true professional who consistently delivered high-quality work that exceeded our expectations.</p>

                            </div>
                        </div>


                        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img class="rounded-t-lg object-cover h-[300px] w-full" src={rahul} alt="" />
                            </a>
                            <div class="p-5">
                                <a href="#">
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Rahul Sharma</h5>
                                </a>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">JavaScript React/Redux developer with over two years of practical experience creating robust user interfaces. Proficient in HTML/CSS/JavaScript frameworks, Typescript, REST, HTTP and backend programming with C# .Net, adept at collaborating within Agile environments to optimize applications and drive quality-focused software development.</p>

                            </div>
                        </div>

                        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img class="rounded-t-lg object-cover h-[300px] w-full" src={gurpreet} alt="" />
                            </a>
                            <div class="p-5">
                                <a href="#">
                                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Gurpreet Singh</h5>
                                </a>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"> Meet Gurpreet, a dedicated and enthusiastic backend developer with 1 year of professional experience. With a passion for coding and a focus on building the behind-the-scenes functionality that powers web and mobile applications, Gurpreet is on a journey to make technology work seamlessly for users.</p>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default About;