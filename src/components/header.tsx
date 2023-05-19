
import * as React from 'react';
import Link from 'next/link';
import Wrapper from './wrapper';
interface IHeaderProps{
}

export default function Header(props: IHeaderProps) {
    const {
    } = props;

    return (
        <>

            <div style={{
                width:'100%',
                height:'60px',
                backgroundColor:'black',
                display:'flex',
                alignItems:'center',
                justifyContent:'center'
            }}>
                <Wrapper>  
                    <div style={{
                        display:'flex',

                    }}>

                        <div
                            style={{
                            }}
                        >
                            <Link href="/countries">
                                <span
                                    style={{
                                        color:'white'
                                    }}
                                >
                                    Countries
                                </span>
                            </Link>
                        </div>

                        <div
                            style={{
                                marginLeft:'20px'
                            }}
                        >
                            <Link href="/countires">
                                <span
                                    style={{
                                        color:'white'
                                    }}
                                >
                                    Live Events
                                </span>
                            </Link>
                        </div>
                    </div>
                    
                </Wrapper>
             </div>
        </>
    )

}