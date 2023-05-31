import * as React from 'react';
import Link from 'next/link';
import Wrapper from './wrapper';
interface IUploadImageProps{
    caption?: string;
    setImage: React.Dispatch<React.SetStateAction<any>>;
}

export default function UploadImage(props: IUploadImageProps) {
    const {
        caption,
        setImage
    } = props;
    const inputRef = React.useRef(); 

    const handleFileChange = async (e: any) => {
      const file = e.target.files[0];
      if (file) {
        await handleImageUpload(file);
      }
    };


    const handleImageUpload = async (file: any) => {
        // setImage(URL.createObjectURL(file));
        // WARNING: For POST requests, body is set to null by browsers.

        var data = new FormData();
        data.append("file", file);
        
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            setImage("https://livescorely-backend.herokuapp.com/api/files/"+JSON.parse(this.responseText).file_name);
        }
        });

        xhr.open("POST", "https://livescorely-backend.herokuapp.com/api/files/upload");

        xhr.send(data);


    };

    // console.log(image)
    return (
        <>

            <div
                style={{
                    display:'flex',
                    flexDirection:'column',
                    marginTop:'15px'
                }}
            >
                <span>{caption}</span>
                <div
                    style={{
                        marginTop:'10px'
                    }}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ 
                            width:400,
                            height:40

                        }} 
                    />
                </div>
            </div>
        </>
    )

}