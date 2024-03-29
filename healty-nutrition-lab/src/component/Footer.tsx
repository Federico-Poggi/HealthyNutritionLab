import {CiTwitter} from "react-icons/ci";
import {FaFacebookSquare} from "react-icons/fa";
import {IoLogoInstagram} from "react-icons/io5";
import {FaLinkedin} from "react-icons/fa6";
import Logo from '../assets/Logo.svg'
import { FaGithub } from "react-icons/fa";

export function Footer() {
    const date:Date=new Date();
    const year:number=date.getFullYear();
    return (
        <>
            <div className = {"flex desktop:justify-evenly desktop:p-10 h-[200px]"}>
                <div className = {"desktop:w-2/12 "}>
                    <span className={"flex"}>
                        <img src={Logo} alt={"logo"} className={"desktop:w-[20px] tablet:w-[20px] mr-2"}/>
                    <h4 id = {"footer-brand"}
                        className = {"desktop:text-[20px] tablet:text-[20px] tablet: phone:"}>HealthyNutritionLab</h4>
                        </span>
                    <p id = {"footer-slogan"} className = {"desktop:text-[12px] tablet:text-[12px] py-2 phone:"}>Fuel Your Body,
                                                                                                       Maximize Your
                                                                                                       Potential</p>
                    <span id = {"footer-icon"} className = {"flex"}>
                        <CiTwitter size = {20} className = {"icon-social"}/>
                        <FaFacebookSquare size = {20} className = {"icon-social"}/>
                        <IoLogoInstagram size = {20} className = {"icon-social"}/>
                        <a href="https://www.linkedin.com/in/federico-poggi-full-stack-developer/"><FaLinkedin size = {20} className = {"icon-social"}/></a>
                        <a href="https://github.com/Federico-Poggi"><FaGithub size={20} className={"icon-social"}/></a>
                    </span>
                </div>
                <div className = {"desktop:text-[15px] tablet:text-[15px] footer-link w-1/6"}>
                    <h4>Services</h4>
                </div>
                <div className = {"desktop:text-[15px] tablet:text-[15px] footer-link w-1/6"}>
                    <h4>Company</h4>
                    <ul className = {"desktop:text-[10px] tablet:text-[10px] text-[#c4c4c4] leading-5"}>
                        <li>About</li>
                        <li>Contact</li>
                        <li>Articles</li>
                    </ul>
                </div>
                <div className = {"desktop:text-[15px]  tablet:text-[15px] footer-link w-1/6"}>
                    <h4>Info</h4>
                    <ul className = {"desktop:text-[10px]  tablet:text-[10px] text-[#c4c4c4] leading-5"}>
                        <li>Privacy&policy</li>
                        <li>Terms and Condition</li>
                    </ul>
                </div>
            </div>
            <div className={"text-white desktop:h-[100px] desktop:w-[1650px] desktop:mx-auto border-t opacity-10"}>
                <p className={"desktop:text-[15px] pt-2"}>&copy;Copyright {year}</p>
            </div>
        </>
    );
}