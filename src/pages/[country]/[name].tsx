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
  const { name, id:country_id } = router.query;

  const [countires, setCountries] = useState<any>([]);
  const [_countires, _setCountries] = useState<any>([]);

  useEffect(()=>{


    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        setCountries(JSON.parse(this.responseText));
    }
    });

    xhr.open("GET", API_ENDPOINT+"/live-events/tournaments_stages");

    xhr.send();

  }, []);

  useEffect(() => {
    if (name) {
      const filtered = countires?.tournaments_stages?.filter((country: any) => country.country_name.includes(name as string));
      _setCountries(filtered);
    }
  }, [name, countires]);
 

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
            >Country leagues</span>
            <Link href={`/add-league/${name}?country_id=${country_id}`}
                style={{
                    color:'blue'
                }}
            >
                Add league +
            </Link>
            </div>
            <div style={{
                marginTop:'20px',
                display:'flex',
                flexDirection:'column',
                marginBottom:'20px'
            }}>
                {_countires && _countires[0]?.leagues?.map((league: any)=> (
                    <>
                        <Link href={`/league/${league?.league_name}?id=${league?.country_id}&country_name=${league.country_name}`}
                        
                            style={{
                                color:'blue',
                                marginBottom:'10px'
                            }}
                        >
                            {league.league_name}
                        </Link>
                    </>
                ))}
            </div>

        </div>
      </Wrapper>
    </>
  )
}