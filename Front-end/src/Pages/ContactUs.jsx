import { useRef } from 'react';
// import emailjs from '@emailjs/browser';
import emailjs from 'emailjs-com';
import Navbar from '../Layout/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios'
const ContactUs = () => {

    const [contactUs, setContactUs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5151/contactUs')
            .then((response) => {
                setContactUs(response.data);
                console.log(response.data)
            })
            .catch((error) => console.log(error.message))
    }, []);


    console.log(contactUs)

    const form = useRef();




    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_jd8mwcs', 'template_alpkyij', form.current, 'gAiCkcUX3xAKV2ypr')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };
    return (
        <>
            <Navbar />
            <section className="">

                {/* Jumbotron */}
                <div
                    className="relative  overflow-hidden bg-cover bg-no-repeat "
                    style={{
                        backgroundImage:
                            'url("https://cdn.discordapp.com/attachments/1084354501642813450/1114243928644911187/conactus.png")',
                        height: 600
                    }}
                >
                    <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full overflow-hidden  bg-fixed">
                        <div className="flex h-full items-center justify-center">
                            <div className="px-6 text-center text-white md:px-12">
                                <h1 className="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
                                    Contact with Us <br />
                                    <span>now</span>
                                </h1>
                                <button
                                    type="button"
                                    className="rounded border-2 border-neutral-50 px-[46px] pt-[14px] pb-[12px] text-sm font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-100 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200"
                                    data-te-ripple-init=""
                                    data-te-ripple-color="light"
                                >
                                    Mail US
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Jumbotron */}
            </section>

            <div className=' '>
                <section className="py-10 bg-gray-100 sm:py-16 lg:py-24">
                    <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                        <div className="max-w-2xl mx-auto text-center">
                            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl lg:text-5xl">Say Hi</h2>
                            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-500"> You can contact us anytime to share your ideas on how to improve our company. We value your support and would be glad to have you as a valuable contributor.
                            </p>
                        </div>

                        <div className="max-w-5xl mx-auto mt-12 sm:mt-16">
                            <div className="grid grid-cols-1 gap-6 px-8 text-center md:px-0 md:grid-cols-3">
                                <div className="overflow-hidden bg-white rounded-xl">
                                    <div className="p-6">
                                        <svg className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                fill='#2E594A'
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                        <p className="mt-6 text-lg font-medium text-gray-900">
                                            <a href="tel:+962790012079">{contactUs.phone_number}</a>
                                        </p>
                                    </div>
                                </div>

                                <div className="overflow-hidden bg-white rounded-xl">
                                    <div className="p-6">
                                        <svg className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path fill='#2E594A' d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <p className="mt-6 text-lg font-medium text-gray-900">
                                            <a href="mailto:OWNER@GOAT.com">{contactUs.email}</a>
                                        </p>
                                    </div>
                                </div>

                                <div className="overflow-hidden bg-white rounded-xl">
                                    <div className="p-6">
                                        <svg className="flex-shrink-0 w-10 h-10 mx-auto text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path fill='#2E594A ' d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path fill='#2E594A' d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <p className="mt-6 text-lg font-medium leading-relaxed text-gray-900">
                                            <a href={contactUs.location_link} target="_blank" rel="noopener noreferrer">
                                                Our Location
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 overflow-hidden bg-white rounded-xl">
                                <div className="px-6 py-12 sm:p-12">
                                    <h3 className="text-3xl font-semibold text-center text-gray-900">Send us a message</h3>

                                    <form action="#" method="POST" className="mt-14" ref={form} onSubmit={sendEmail}>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                                            <div>
                                                <label className="text-base font-medium text-gray-900"> Your name </label>
                                                <div className="mt-2.5 relative">
                                                    <input required type="text" name="name" id="" placeholder="Enter your full name" className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-green-600 caret-green-600" />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-base font-medium text-gray-900"> Email address </label>
                                                <div className="mt-2.5 relative">
                                                    <input required type="email" name="email" id="" placeholder="Enter your full name" className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-green-600 caret-green-600" />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-base font-medium text-gray-900"> Phone number </label>
                                                <div className="mt-2.5 relative">
                                                    <input required type="tel" name="phone" id="" placeholder="Enter your full name" className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-green-600 caret-green-600" />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="text-base font-medium text-gray-900"> Company name </label>
                                                <div className="mt-2.5 relative">
                                                    <input required type="text" name="company" id="" placeholder="Enter your full name" className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-green-600 caret-green-600" />
                                                </div>
                                            </div>

                                            <div className="sm:col-span-2">
                                                <label className="text-base font-medium text-gray-900"> Message </label>
                                                <div className="mt-2.5 relative">
                                                    <textarea required name="message" id="" placeholder="" className="block w-full px-4 py-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md resize-y focus:outline-none focus:border-green-600 caret-green-600" rows="4"></textarea>
                                                </div>
                                            </div>


                                            <button type="submit" className="relative left-60 w-ful px-5 py-2 font-medium text-white group">
                                                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-green-500 group-hover:bg-green-700 group-hover:skew-x-12"></span>
                                                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform skew-x-12 bg-green-700 group-hover:bg-green-500 group-hover:-skew-x-12"></span>
                                                <span className="absolute bottom-0 left-0 hidden w-10 h-20 transition-all duration-100 ease-out transform -translate-x-8 translate-y-10 bg-green-600 -rotate-12"></span>
                                                <span className="absolute bottom-0 right-0 hidden w-10 h-20 transition-all duration-100 ease-out transform translate-x-10 translate-y-8 bg-green-400 -rotate-12"></span>
                                                <span className="relative">Sign up</span>
                                            </button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}

export default ContactUs