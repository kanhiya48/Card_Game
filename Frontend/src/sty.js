import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
`;
const slideIn1 = keyframes`
  from {
    transform: translateX(200%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut1 = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

export const Login=styled.button`
background:#D2691E;
width:50%;
box-shadow: 0px 10px 40px 0px #00000029;
 border-radius: 8px;
height:40px;
 margin-left: auto;
  margin-right: auto;
`
  
  export const Heading=styled.h2`
  
  color:#04072F;
  //styleName: Heading 1 - Bold - 48;
font-family: Poppins;
font-size: 48px;
font-weight: 700;
line-height: 53px;
letter-spacing: 0em;
text-align: center;
`
  export const Labe=styled.p`
  margin-bottom:2px
font-family: Poppins;
font-size: 18px;
font-weight: 500;
line-height: 20px;
letter-spacing: 0em;
text-align: left;
// margin:0;

  `
export const Input=styled.input`

width: 100%;
height: 30px;

border-radius: 8px;
 border: ${(props) => props.bor || '1px solid #04072F66'};
 border-color:#04072F66;
 border-width:2px;
background: #FFFFFF;
// Rectangle 1395;
box-shadow: 0px 10px 40px 0px #00000029;

margin:0;
&:focus{
  border:${(props)=>props.bor};
  outline: none; 
}
`
export const Smalltext=styled.p`
//styleName: Body Light - Regular - 18;
display: inline;
font-family: Poppins;
font-size: 18px;
font-weight: 400;
line-height: 20px;
color:  ${(props)=>props.color};

letter-spacing: 0em;
text-align: left;
// background: #737B86;
span{
  color: #F78719;

}

`
export const Checkbox=styled.input`
display:inline;
type:checkbox;
// top: 372px;
// left: 944px;

border-radius: 8px;
border: 1px;
border: 1px solid #04072F66;

background: #FFFFFF;
// Rectangle 1395;
box-shadow: 0px 10px 40px 0px #00000029;
// margin : 2% 2% 2% 0%
`
export const Image = styled.img`
  max-width: 100%; /* Ensure the image doesn't exceed the container width */
  height: auto; /* Maintain aspect ratio */
`;
 export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 40% 60%; /* Two columns, first takes up 60%, second takes up 40% */
  grid-gap: 10px; /* Gap between grid items */
  @media (max-width: 750px) {
    grid-template-columns: 1fr; /* Single column for screens less than 600px wide */
  
`;

export const Wrapper=styled.section`
.sep{
  display: flex;
  justify-content: space-between;
}
.cenbtn{
  display: flex;
  justify-content: center;
}
.passinp{
  display:flex;
  border-radius: 8px;
width:100%;
border: 2px solid #04072F66;
align-items: center;

box-shadow: 0px 10px 40px 0px #00000029;
margin:0;
background: white;
&:focus-within{
  border-color: #000;
border-width:3px;
}
span{
  
  background: #FFFFFF;
}
input{
  box-shadow:none;
}
}
.vec{
   border-radius: 8px;
   margin-right :3%;
}
.imgcss{
padding:25%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${({ show }) => (show ? slideIn : '')} 0.5s forwards;
}
.rightcss{
    padding :12%;
    box-shadow: 0px 10px 40px 0px #00000029;
      animation: ${({ show }) => (show ? slideIn1 : '')} 0.5s forwards;
    
}
.rightcssouter{
    padding:5%;
}
`