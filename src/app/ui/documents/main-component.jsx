"use client"
import { useState } from "react"
import CreateDocForm from "./create-form"
import DocumentBuilder from "./ContinueDoc"
const MainComponent = () => {
    const [step, setStep] = useState(1)
    const [shouldShowSecond, setShouldShowSecond] = useState(false)
    const [data, setData] = useState(null)
    const handleSwitch = (file, metadata) => {
        console.log("file: ", file)
        console.log("metadata: ", metadata)
        setData({file, metadata})
        setShouldShowSecond(!shouldShowSecond)
    }

    const handleNext = (file, metadata) => {
        console.log("file: ", file)
        console.log("metadata: ", metadata)
        setData({file, metadata})
        setStep(2)
    }

    const handleBack = () => {
        setStep(1)
    }
    return (
        // <div>
        //     {step === 1 && <CreateDocForm onNext={handleNext}/>}
        //     {step === 2 && <DocumentBuilder onBack={handleBack} data={data}/>}
        // </div>
        <div>
            <input type="file" id="pdfInput" />
            <DocumentBuilder onNext={handleNext}/>
            <canvas id="c" width="800" height="600"></canvas>
        </div>
        
    )
}
export default MainComponent