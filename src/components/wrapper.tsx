import React, { ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
  wrap?: string;
}

const Wrapper: React.FC<WrapperProps> = ({ children, wrap }) => {
  return (
    <div style={{ display:'flex', width: '100%', justifyContent:'center' }}>
        <div
            style={{
                width:wrap ? wrap :'70%',
                maxWidth:1050
            }}
        >
            {children}
        </div>
    </div>
  );
};

export default Wrapper;