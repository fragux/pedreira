import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as GrIcons from 'react-icons/gr';
import * as GiIcons from 'react-icons/gi';
import * as RiIcons from 'react-icons/ri';

export const SidebarData = [ 
    {
        title:'VISTA GERAL',
        icon: <GrIcons.GrOverview size={20}/>,
        path: '/overview'
      
    },
{
    title:'MONOFIO NFC 2000',
    icon: <AiIcons.AiOutlineFundView size={20}/>,
    path: 'MONOFIO NFC 2000'
  
},
{
    title:'LOUSADA 2000',
    icon: <AiIcons.AiOutlineFundView size={20}/>,
    path: 'LOUSADA 2020'
  
},
{
    title:'MINORÇA',
    icon: <AiIcons.AiOutlineFundView size={20}/>,
    path: 'MINORCA'
  
},
{
    title:'SERRA 3500',
    icon: <GiIcons.GiCircularSaw size={20}/>,
    path: 'SERRA 3500'
  
},
{
    title:'GRANALHADORA',
    icon: <RiIcons.RiFileShredFill size={20}/>,
    path: '/granalhadora'
  
},
{
    title:'MULTIFIOS',
    icon: <AiIcons.AiOutlineFundView size={20}/>,
    path: '/multifios'
  
},
{
    title:'LOUSADA XT100',
    icon: <AiIcons.AiOutlineFundView size={20}/>,
    path: '/lousadat100'
  
}
]

