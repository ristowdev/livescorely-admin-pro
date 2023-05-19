import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '@/components/header'
import Wrapper from '@/components/wrapper'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { API_ENDPOINT } from '../../../config'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter();
  const { name, id, country_name } = router.query;

  const [liveFakeEvents, setLiveFakeEvents] = useState<any>([]);

  useEffect(()=>{

    // WARNING: For GET requests, body is set to null by browsers.
    if(country_name && name){
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            setLiveFakeEvents(JSON.parse(this.responseText));
        }
        });

        xhr.open("GET", `${API_ENDPOINT}/live-events/fake-events/${country_name}/${name}`);

        xhr.send();
    }

  }, [name, country_name]); 


  function formatUnixTimestamp(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000);
  
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().padStart(4, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  return (
    <>
      <Head>
        <title>ADMIN | LIVESCORELY</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Header />
      <Wrapper>  

        <div
            style={{
                marginTop:'30px'
            }}
        >
            <div style={{
                display:'flex',
                alignItems:'center'
            }}>
            <span 
                style={{
                    paddingRight:'20px'
                }}
            >League live events</span>
            <Link href={`/add-event/${name}?id=${id}&country_name=${country_name}`}
                style={{
                    color:'blue'
                }}
            >
                Add event +
            </Link>
            </div>
            <div style={{
                marginTop:'20px',
                display:'flex',
                flexDirection:'column',
                marginBottom:'20px'
            }}>
                 
            </div>


            <div
                style={{
                    marginTop:'20px'
                }}
            >
                {liveFakeEvents?.map((live_fake_event: any)=> (
                    <>
                        <div
                            style={{
                                width:'100%',
                                background:'#eee',
                                // height:'40px',
                                borderRadius:'5px',
                                marginBottom:'20px'
                            }}
                        >
                            <div
                                style={{
                                    padding:"10px",
                                    display:'flex',
                                    width:'100%'
                                }}
                            >
                                <div
                                    style={{
                                        width:'15%',
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center'
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize:'14px'
                                        }}
                                    > 
                                        45'
                                    </span>
                                </div>
                                <div
                                    style={{
                                        width:'50%',
                                        display:'flex',
                                        flexDirection:'column'
                                    }}
                                >
                                    <div
                                        style={{
                                            marginBottom:'5px'
                                        }}
                                    >
                                        
                                        <span
                                            style={{
                                                fontSize:'14px'
                                            }}
                                        > 
                                            {live_fake_event.home_name}
                                        </span>
                                    </div>

                                    <div
                                        style={{
                                            marginBottom:'0px'
                                        }}
                                    >
                                        
                                        <span
                                            style={{
                                                fontSize:'14px',
                                            }}
                                        > 
                                            {live_fake_event.away_name}
                                        </span>
                                    </div>
                                </div>

                                <div
                                    style={{
                                        width:'20%',
                                        display:'flex',
                                        flexDirection:'column',
                                        justifyContent:'flex-end',
                                        borderRight:'1px solid #dcdcdc'
                                    }}
                                >
                                    <div
                                        style={{
                                            marginBottom:'5px',
                                            display:'flex',
                                            alignItems:'center'
                                        }}
                                    >
                                        <div
                                            style={{
                                                width:'20%'
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize:'14px',
                                                    color:'red'
                                                }}
                                            > 
                                                {live_fake_event.home_score_current ? live_fake_event.home_score_current : 0}
                                            </span>
                                        </div>
                                        <div
                                            style={{
                                                width:'20%'
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize:'14px',
                                                    color:"#777777"
                                                }}
                                            > 
                                                ({live_fake_event.home_score_part_1 ? live_fake_event.home_score_part_1 : 0})
                                            </span>
                                        </div>
                                        
                                    </div>

                                    <div
                                        style={{
                                            marginBottom:'5px',
                                            display:'flex',
                                            alignItems:'center'
                                        }}
                                    >
                                        <div
                                            style={{
                                                width:'20%'
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize:'14px',
                                                    color:'red'
                                                }}
                                            > 
                                                {live_fake_event.away_score_current ? live_fake_event.away_score_current : 0}
                                            </span>
                                        </div>
                                        <div
                                            style={{
                                                width:'20%'
                                            }}
                                        >
                                            <span
                                                style={{
                                                    fontSize:'14px',
                                                    color:"#777777"
                                                }}
                                            > 
                                                ({live_fake_event.away_score_part_1 ? live_fake_event.away_score_part_1 : 0})
                                            </span>
                                        </div>
                                        
                                    </div>
                                </div>

                                <div
                                    style={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        width:'20%',
                                        borderRight:'1px solid #dcdcdc'

                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize:'13px'
                                        }}
                                    >
                                        {formatUnixTimestamp(live_fake_event.start_time)}
                                    </span>
                                </div>

                                <div
                                    style={{
                                        display:'flex',
                                        alignItems:'center',
                                        justifyContent:'center',
                                        width:'30%'

                                    }}
                                >
                                    <Link href={`/event-details/${live_fake_event._id}`}>
                                        <span
                                            style={{
                                                fontSize:'13px',
                                                color:'blue',
                                                textDecoration:'underline'
                                            }}
                                        >
                                            DETAILS
                                        </span>
                                    </Link>

                                    <Link href={`/edit-event/${live_fake_event._id}`} style={{marginLeft:'30px'}}>
                                        <span
                                            style={{
                                                fontSize:'13px',
                                                color:'red',
                                                textDecoration:'underline'
                                            }}
                                        >
                                            DELETE
                                        </span>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
      </Wrapper>
    </>
  )
}
