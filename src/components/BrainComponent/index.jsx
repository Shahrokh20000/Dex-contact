import Image from "next/image";
import { useEffect, useState } from "react";
import Brain from '../../../public/bg/OIG1.png';
import Line from '../../../public/img/Line callout 18 3.png';
import Line1 from '../../../public/img/Line callout 18 2.png';
import Container from "../Container";

const BrainComponent = () => {
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const countdown = setInterval(() => {
            const now = new Date();
            const endTime = new Date();
            endTime.setHours(24, 0, 0, 0); // Set to midnight (24:00)  

            const distance = endTime - now;
            if (distance < 0) {
                clearInterval(countdown);
                setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft({ hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(countdown);
    }, []);

    return (
        <>
            <Image src={Brain} alt='' className={'w-full'} />
            <div className='relative text-[#bbb]'>
                <Image src={Line} alt='' className={'w-1/2 -mt-[60%] translate-x-[14%]'} />
                <p className='absolute bottom-[30%] left-[15%] text-sm w-[120px] '>
                    Invest USDT and MATIC
                </p>
            </div>
            <div className='relative text-[#bbb]'>
                <Image src={Line1} alt='' className={'w-1/2 translate-x-[93%] -mt-[50%] relative'} />
                <p className='absolute bottom-[34%] right-[13%] text-sm w-[120px] text-right '>
                    Get 1.5% daily profit
                </p>
            </div>
            <Container>
                <div className="text-center text-gray-400">
                    <h2 className="text-lg font-bold mb-4">until get profits:</h2>
                    <div className='flex flex-col items-center border border-[#00F0FF] rounded-2xl p-3'>
                        <p className="text-2xl text-white">
                            {timeLeft.hours.toString().padStart(2, '0')}:
                            {timeLeft.minutes.toString().padStart(2, '0')}:
                            {timeLeft.seconds.toString().padStart(2, '0')}
                        </p>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default BrainComponent;