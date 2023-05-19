import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '@/components/header'
import Wrapper from '@/components/wrapper'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { API_ENDPOINT } from '../../../config'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router = useRouter();
  const { country, country_id } = router.query;
 
  const [leagueName, setLeagueName] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLeagueName(event.target.value);
  };
  

  const handleAddLeague = () => {
    // WARNING: For POST requests, body is set to null by browsers.
        if(leagueName){
            var data = JSON.stringify({
                "league_name": leagueName,
                "league_country": country,
                "country_id": country_id,
                "tournament_image": ""
            });
            
            var xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            
            xhr.addEventListener("readystatechange", function() {
                if(this.readyState === 4) {
                    router.push(`/country/${country}?id=${country_id}`)
                }
            });
            
            xhr.open("POST", API_ENDPOINT+"/live-events/add-league");
            xhr.setRequestHeader("Content-Type", "application/json");
            
            xhr.send(data);
        }
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
                marginTop:'30px',
                display:'flex',
                flexDirection:'column'
            }}
        >
            <div style={{
                display:'flex',
                flexDirection:'column'
            }}>
            <span 
                style={{
                    paddingRight:'20px'
                }}
            >Add new league in: <b><span 
                style={{
                    textTransform:'uppercase'
                }}
            >{country}</span></b></span>
            {/* <Link href={`/add-league/${name}`}
                style={{
                    color:'blue'
                }}
            > 
            </Link> */}
            <div style={{
                marginTop:'20px',
                display:'flex',
                flexDirection:'column',
                width:'300px'
            }}>
                <input
                    placeholder='League name'
                    style={{
                        outline:'none',
                        width:'300px',
                        height:'35px',
                        backgroundColor:'white',
                        padding:1,
                        border:'1px solid grey',
                        borderRadius:'5px',
                        paddingLeft:'5px',
                        paddingRight:'5px',
                        color:'black'
                    }}
                    value={leagueName}
                    onChange={handleInputChange}
                />

                <button
                    style={{
                        marginTop:'10px',
                        height:'30px',
                        borderRadius:'5px',
                        border:'none',
                        color:'white',
                        backgroundColor:'black',
                        cursor:'pointer'
                    }}
                    onClick={()=>{handleAddLeague()}}
                >
                    ADD
                </button>
            </div>
            </div>
             

        </div>
      </Wrapper>
    </>
  )
}