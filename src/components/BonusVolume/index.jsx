'use client'
import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import BonusTable from "../BonusTable";

const BonusVolume = () => {
    const { address } = useAccount();
    const [isReceivedBonus, setReceivedBonus] = useState(false);
    const [activeTarget, setActiveTarget] = useState(null);
    const [receivedStatuses, setReceivedStatuses] = useState({});

    const dataArray2 = [
        { target: '10000', bonus: 200 },
        { target: '20000', bonus: 500 },
        { target: '50000', bonus: 1500 },
        { target: '100000', bonus: 3000 },
        { target: '200000', bonus: 6000 },
        { target: '500000', bonus: 20000 },
        { target: '1000000', bonus: 50000 },
    ];

    const handleCollectBonus = async (bonus) => {
        try {
            console.log(bonus, address);
            await axios.put('/api/collectBonus', { address, bonus });
            // setReceivedBonus(true);
            window.location.reload()
        } catch (error) {
            console.error('Error collecting bonus: ', error);
        }
    };

    useEffect(() => {
        const fetchBonus = async () => {
            try {
                const response = await axios.put('/api/putBonus', { address });
                if (response.data.hasReceivedBonus === false) {
                    const bonusValue = response.data.bonus;
                    dataArray2.map(async item => {
                        const targetItem = bonusValue.find(b => b.bonus === item.bonus)
                        if (targetItem != undefined) {
                            const resTarget = await axios.get(`/api/getTarget?address=${address}`);
                            if (resTarget.data.foundLine) {
                                const isReceivedArray = resTarget.data.foundLine.targets;
                                const isReceivedFilter = isReceivedArray.filter(item => item.hasTarget === true);
                                const newStatuses = {};
                                isReceivedArray.forEach(item => {
                                    newStatuses[item.bonus] = item.isReceived;
                                });
                                setReceivedStatuses(newStatuses);
                                if (isReceivedFilter.length > 0) {
                                    setActiveTarget(targetItem.bonus);
                                }
                            } else {
                                const user = await axios.post('/api/postTarget', { address, isReceived: false, bonus: targetItem.bonus });

                            }
                        }
                    })
                    // const targetItem = dataArray2.find(item => item.bonus === bonusValue);   
                }
                // setReceivedBonus(response.data.hasReceivedBonus);
            } catch (error) {
                console.error('Error fetching investments: ', error);
            }
        };

        fetchBonus();
    }, [address]);

    return (
        <>
            <table className="text-white w-full ">
                <thead>
                    <tr>
                        <th className="text-gray-400 py-5">Target</th>
                        <th className="text-gray-400 py-5">Bonus</th>
                        <th className="text-gray-400 py-5">Collect Bonus</th>
                    </tr>
                </thead>
                <tbody>
                    {dataArray2.map((item, index) => (
                        <>
                            <BonusTable activeTarget={activeTarget} handleCollectBonus={handleCollectBonus} isReceivedBonus={isReceivedBonus} item={item} receivedStatuses={receivedStatuses} key={index} />
                        </>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default BonusVolume;