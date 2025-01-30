const BonusTable = ({ item, activeTarget, receivedStatuses, isReceivedBonus, handleCollectBonus }) => {
    return (
        <>
            <tr className="text-center py-2 border-y border-y-gray-700">
                <td className="py-5">{item.target}</td>
                <td className="py-5">{item.bonus}</td>
                <td className="py-5">
                    {isReceivedBonus ? (
                        <button className="py-1 px-6 border rounded-full shadow-green border-[#20FF44]" disabled={true}>Received</button>
                    ) : (
                        <button
                            onClick={() => handleCollectBonus(item.bonus)}
                            className={`py-1 px-6 border rounded-full ${activeTarget === item.bonus ? 'border-[#00F0FF] shadow-main' : isReceivedBonus ? 'shadow-green border-[#20FF44]' : 'bg-gray-300'}`}
                            disabled={activeTarget !== item.bonus || receivedStatuses[item.bonus]}>
                            {receivedStatuses[item.bonus] ? 'Received' : 'Collect'}
                        </button>
                    )}
                </td>
            </tr>
        </>
    )
}

export default BonusTable