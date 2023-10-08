import React, { useState, useEffect } from 'react';
import { X } from "lucide-react"
import { Button } from '@/components/ui/button';
import './Welcome.scss';
import Ben from '@/components/ben';

const WelcomePopover = () => {
    const [showPopover, setShowPopover] = useState(false);

    useEffect(() => {
        const hasVisitedBefore = localStorage.getItem('hasVisited');
        if (!hasVisitedBefore) {
            setShowPopover(true);
        }
    }, []);

    const closePopover = () => {
        setShowPopover(false);
        localStorage.setItem('hasVisited', 'true');
    };

    return (
        <>
            {showPopover ?
                <>
                    <div className="overlay"></div>
                    <div className="content-container overflow-y-auto">
                        <div className='p-2 flex justify-between'>
                            <h2>Hello friend!</h2>
                            <Button variant="outline" size="icon" className='flex-shrink-0'>
                                <X className="h-4 w-4" onClick={() => closePopover()} />
                            </Button>
                        </div>
                        <div className='p-4'>
                            <p className='whitespace-pre-line'>
                                Welcome to Ben’s BioArchives, my name is Ben the BioNavigator.
                                <br></br>
                                <br></br>
                                You can ask me in natural language what kinds of datasets you are looking for and I can help you find them. In the future, I can also suggest how these specific datasets can be used to train a transfer learning model, but I will need a bit more practise with that still!
                                <br></br>
                                <br></br>
                                Let me know how I can assist you!
                            </p>
                            <div className='medium-ben'>
                                <Ben />
                            </div>
                            <Button className='mx-auto block' onClick={() => closePopover()}>Enter BioArchives</Button>
                        </div>
                    </div>
                </>

                : null}
        </>
    );
};

export default WelcomePopover;