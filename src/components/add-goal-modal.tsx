
import * as React from 'react';
import Link from 'next/link';
import Wrapper from './wrapper';
import { API_ENDPOINT } from '../../config';
import { useRouter } from 'next/router';

interface IAddGoalModalProps{
    liveFakeEvents:any;
}

export default function AddGoalModal(props: IAddGoalModalProps) {
    const {
        liveFakeEvents
    } = props;
    const router = useRouter();


    const [goalTeam, setGoalTeam] = React.useState('');
    const [byPlayer, setByPlayer] = React.useState('');
    const [assistanceByPlayer, setAssistanceByPlayer] = React.useState('');


    const goalTeamInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGoalTeam(event.target.value);
    };
    
    const byPlayerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setByPlayer(event.target.value);
    };

    const assistanceByPlayerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAssistanceByPlayer(event.target.value);
    }; 

    const handleSubmitGoal = () => {
        if(goalTeam && byPlayer && assistanceByPlayer && liveFakeEvents){
            // const incident_time = 0;
            const currentTime = Math.floor(Date.now() / 1000); // Convert current time to Unix timestamp in seconds
            // const elapsedTime = currentTime - liveFakeEvents.event.stage_start_time; // Calculate elapsed time in seconds
            let elapsedTime = currentTime - liveFakeEvents.event.stage_start_time; // Calculate elapsed time in seconds
            if(liveFakeEvents.event.stage === "SECOND_HALF"){
                elapsedTime = elapsedTime + 2700;
            }
            
            const incident_time = Math.floor(elapsedTime/60);
            const _ev = liveFakeEvents.event;
            console.log(goalTeam)

            let home_score = 0;
            let away_score = 0;

            if(_ev.stage === "FIRST_HALF"){
                home_score = Number(_ev.home_score_part_1)
                away_score = Number(_ev.away_score_part_1)
                if(Number(goalTeam) == 1){ 
                    home_score = home_score + 1; 
                    
                }else if(Number(goalTeam) == 2){  
                    away_score = away_score + 1; 
                } 
            }

            if(_ev.stage === "SECOND_HALF"){
                home_score = Number(_ev.home_score_part_2)
                away_score = Number(_ev.away_score_part_2) 
                if(Number(goalTeam) === 1){ 
                    home_score = home_score + 1
                }else if(Number(goalTeam) === 2){  
                    away_score = away_score + 1
                }
    
            }

            // let home_score_part_1 = 0;
            // let away_score_part_1 = 0;
            // let home_score_part_2 = 0;
            // let away_score_part_2 = 0;

            // if(_ev.stage === "FIRST_HALF"){
            //     home_score = Number(_ev.home_score_part_1)
            //     away_score = Number(_ev.away_score_part_1)
            //     if(Number(goalTeam) == 1){ 
            //         home_score = home_score + 1;
            //         home_score_part_1 = home_score;
                    
            //     }else if(Number(goalTeam) == 2){  
            //         away_score = away_score + 1;
            //         away_score_part_1 = away_score;
            //     }

            // }else if(_ev.stage === "SECOND_HALF"){
            //     home_score = Number(_ev.home_score_part_2)
            //     away_score = Number(_ev.away_score_part_2)
            //     console.log(home_score)
            //     console.log(away_score)
            //     console.log(home_score_part_2)
            //     console.log(away_score_part_2)
            //     if(Number(goalTeam) === 1){ 
            //         home_score = home_score + 1
            //         home_score_part_2 = home_score;
            //     }else if(Number(goalTeam) === 2){  
            //         away_score = away_score + 1
            //         away_score_part_2 = away_score;
            //         console.log(home_score)
            //         console.log(away_score)
            //         console.log(home_score_part_2)
            //         console.log(away_score_part_2)
            //     }
 
            // }

            
            // if(Number(goalTeam) == 1){ 
            //     home_score = home_score + 1
            // }

            // if(Number(goalTeam) == 2){  
            //     away_score = away_score + 1
            // }

            const incident = {
                incident:{
                    incident_team: goalTeam,
                    incident_time: incident_time+"'",
                    incident_participants:{
                        achieved_by:byPlayer,
                        assistence_by:assistanceByPlayer,
                        home_score:Number(home_score),
                        incident_type:'GOAL',
                        away_score:Number(away_score),
                    }
                },
                other:{
                    stage: _ev.stage,
                    event_id: _ev._id,
                    // home_score_part_1: Number(home_score_part_1),
                    // away_score_part_1: Number(away_score_part_1),
                    home_score_part_1: 
                        _ev.stage === "FIRST_HALF" && Number(goalTeam) === 1 ?
                        Number(_ev.home_score_part_1) + 1 : Number(_ev.home_score_part_1)
                    ,
                    away_score_part_1: 
                        _ev.stage === "FIRST_HALF" && Number(goalTeam) === 2 ?
                        Number(_ev.away_score_part_1) + 1 : Number(_ev.away_score_part_1)
                    ,
                    home_score_part_2: 
                        _ev.stage === "SECOND_HALF" && Number(goalTeam) === 1 ?
                        Number(_ev.home_score_part_2) + 1 : Number(_ev.home_score_part_2)
                    ,
                    away_score_part_2: 
                        _ev.stage === "SECOND_HALF" && Number(goalTeam) === 2 ?
                        Number(_ev.away_score_part_2) + 1 : Number(_ev.away_score_part_2)
                    ,
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
            
            xhr.open("POST", API_ENDPOINT+"/live-events/add-event-goal");
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
                        <span>ADD EVENT GOAL</span>

                        <div
                            style={{
                                marginTop:'20px',
                                display:'flex',
                                flexDirection:'column'
                            }}
                        >
                            <span>Goal team:</span>
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
                            <span>By player:</span>
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
                            <span>Assistence by player:</span>
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
                            >ADD GOAL</button>

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