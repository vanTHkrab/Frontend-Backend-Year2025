import React, { useState } from "react";
import { InputField } from "./components/InputField";
import { Button } from "./components/Button";
import { DisplayMessage } from "./components/DisplayMessage";

function App() {
    const [name, setName] = useState("");
    const [score, setScore] = useState("");
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");

    const handleSubmit = () => {
        if (name.trim() === "" || score.trim() === "") {
            setMessage("กรุณากรอกชื่อและคะแนนให้ครบถ้วน");
            setMessageColor("red");
            return;
        }

        const numScore = Number(score);

        if (isNaN(numScore)) {
            setMessage("คะแนนไม่ถูกต้อง");
            setMessageColor("red");
            return;
        } else if (numScore < 0 || numScore > 100) {
            setMessage("คะแนนต้องอยู่ในช่วง 0-100");
            setMessageColor("red");
            return;
        }

        if (numScore < 50) {
            setMessage(`คุณ ${name} ได้คะแนน ${numScore} : ไม่ผ่าน`);
            setMessageColor("red");
        } else {
            setMessage(`คุณ ${name} ได้คะแนน ${numScore} : ผ่าน`);
            setMessageColor("green");
        }
    };

    const handleScoreChange = (e) => {
        const value = e.target.value;
        if (value === "" || /^\d+$/.test(value)) {
            setScore(value);
        }
    };

    return (
        <div style={{
            maxWidth: '400px',
            margin: '32px auto',
            padding: '24px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '24px',
                color: '#1f2937'
            }}>
                ตรวจสอบคะแนนสอบ
            </h1>

            <div>
                <InputField
                    type="text"
                    placeholder="กรอกชื่อของคุณ"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    label="ชื่อนักเรียน"
                />

                <InputField
                    type="text"
                    placeholder="กรอกคะแนนของคุณ"
                    value={score}
                    onChange={handleScoreChange}
                    label="คะแนนสอบ (0-100)"
                />


                <Button
                    onClick={handleSubmit}
                >
                    ตรวจสอบคะแนน
                </Button>

                <DisplayMessage
                    message={message}
                    messageColor={messageColor}
                />
            </div>
        </div>
    );
}

export default App;