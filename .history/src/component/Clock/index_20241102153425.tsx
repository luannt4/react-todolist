import React, { useEffect, useState } from 'react';

const 
function ClockCountdown() {
    // Create state `countdown` with initial value of 10
    const [countDown,setCountDown]= useState(10);
    

    useEffect(()=>{
        // Nếu `timeLeft` là 0, dừng đồng hồ
        if(countDown ===0) return;

        // Thiết lập interval để giảm `timeLeft` mỗi giây
        let intervalId = setTimeout(()=> {
            setCountDown((countDown)=> countDown - 1)
        },1000)

        // Cleanup interval khi component bị hủy hoặc khi `timeLeft` thay đổi  
        return () => clearInterval(intervalId);
    },[countDown]);

    return (
        <div className="p-5">
            <h1 className="mb-3">đồng hồ đếm ngược : {countDown}</h1>
        </div>
    )
}
export default ClockCountdown;