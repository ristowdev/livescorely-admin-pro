
import * as React from 'react';
import Link from 'next/link';
import Wrapper from './wrapper';
import { API_ENDPOINT } from '../../config';
import { useRouter } from 'next/router';

interface IAddCardModalProps{
    liveFakeEvents:any;
}

export default function AddCardModal(props: IAddCardModalProps) {
    const {
        liveFakeEvents
    } = props;
    const router = useRouter();


    const [goalTeam, setGoalTeam] = React.useState('');
    const [byPlayer, setByPlayer] = React.useState('');
    const [assistanceByPlayer, setAssistanceByPlayer] = React.useState('');

    const assistanceByPlayerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAssistanceByPlayer(event.target.value);
    }; 


    const goalTeamInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGoalTeam(event.target.value);
    };
    
    const byPlayerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setByPlayer(event.target.value);
    };
 
    const handleSubmitGoal = () => {
        if(goalTeam && byPlayer && liveFakeEvents){
            let card_key = "";
            if(assistanceByPlayer === "YELLOW"){
                card_key = "YELLOW_CARD";
            }else if(assistanceByPlayer === "RED"){
                card_key = "RED_CARD";
            }
            // const incident_time = 0;
            const currentTime = Math.floor(Date.now() / 1000); // Convert current time to Unix timestamp in seconds
            const elapsedTime = currentTime - liveFakeEvents.event.stage_start_time; // Calculate elapsed time in seconds
            const incident_time = Math.floor(elapsedTime/60);
            const _ev = liveFakeEvents.event;
            console.log(goalTeam)

            const incident = {
                incident:{
                    incident_team: goalTeam,
                    incident_time: incident_time+"'",
                    incident_participants:{
                        participant_name:byPlayer,
                        incident_type:card_key,
                    }
                },
                other:{
                    event_id: _ev._id,
                    stage: _ev.stage
                }
            }

            console.log(incident)
 
            var data = JSON.stringify(incident);
            
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            
            xhr.addEventListener("readystatechange", function() {
              if(this.readyState === 4) {
                router.reload();
              }
            });
            
            xhr.open("POST", API_ENDPOINT+"/live-events/add-event-card");
            xhr.setRequestHeader("Content-Type", "application/json");
            
            xhr.send(data);
        }
    }
    
    return (
        <> 

            <div style={{
                width:'100%',
                height:'100%',
                backgroundColor:'#0000006e',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                position:'fixed',
                zIndex:9999,
                top:0,
                left:0
            }}>
                 <div
                    style={{
                        width:'600px',
                        borderRadius:'5px',
                        background:'white'
                    }}
                 > 
                    <div
                        style={{
                            padding:'20px'
                        }}
                    >
                        <span>ADD EVENT CARD</span>
                        <div
                            style={{
                                marginTop:'20px',
                                display:'flex',
                                flexDirection:'column'
                            }}
                        >
                            <span>For team:</span>
                            <input 
                                placeholder='1 | 2'
                                style={{
                                    width:'100%',
                                    border:'1px solid #ccc',
                                    outline:'none',
                                    borderRadius:'5px',
                                    padding:'10px',
                                    color:'black',
                                    backgroundColor:'white',
                                    marginTop:'5px'
                                }}

                                value={goalTeam}
                                onChange={goalTeamInput}
                            />
                        </div>

                        <div
                            style={{
                                marginTop:'20px',
                                display:'flex',
                                flexDirection:'column'
                            }}
                        >
                            <span>Card type:</span>
                            <input 
                                placeholder='YELLOW | RED'
                                style={{
                                    width:'100%',
                                    border:'1px solid #ccc',
                                    outline:'none',
                                    borderRadius:'5px',
                                    padding:'10px',
                                    color:'black',
                                    backgroundColor:'white',
                                    marginTop:'5px'
                                }}

                                value={assistanceByPlayer}
                                onChange={assistanceByPlayerInput}
                            />
                        </div>

                        <div
                            style={{
                                marginTop:'20px',
                                display:'flex',
                                flexDirection:'column'
                            }}
                        >
                            <span>For player:</span>
                            <input 
                                placeholder='Jack S. Daf'
                                style={{
                                    width:'100%',
                                    border:'1px solid #ccc',
                                    outline:'none',
                                    borderRadius:'5px',
                                    padding:'10px',
                                    color:'black',
                                    backgroundColor:'white',
                                    marginTop:'5px'
                                }}

                                value={byPlayer}
                                onChange={byPlayerInput}
                            />
                        </div>


                        <div
                            style={{
                                marginTop:'20px',
                                display:'flex',
                                flexDirection:'column'
                            }}
                        >
                            <button
                                style={{
                                    height:'40px',
                                    cursor:'pointer',
                                    backgroundColor:'green',
                                    borderRadius:'5px',
                                    outline:'none',
                                    border:'none'
                                }}
                                onClick={()=>{handleSubmitGoal()}}
                            >ADD CARD</button>

                            <button
                                style={{
                                    height:'40px',
                                    cursor:'pointer',
                                    backgroundColor:'red',
                                    borderRadius:'5px',
                                    outline:'none',
                                    border:'none',
                                    marginTop:'10px'
                                }}
                            >CANCLE</button>
                        </div>
                    </div>
                 </div>
             </div>
        </>
    )

}