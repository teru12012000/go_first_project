'use client'
import Image from 'next/image'
import styles from './page.module.css'
import useSWR from 'swr'
import { getTodo } from '@/api/getTodo';
import { todoType } from '@/shared/types/apiType';

export default function Home() {
  const {data,isLoading}=useSWR('http://localhost:9090/get_datas',getTodo);
  if(isLoading)return<div>Loding....</div>
  return (
    <div>
      <ul>
        {data?.map((item:todoType)=>(
          <li
            key={item.id}
          >
            {item.content}
          </li>
        ))}
      </ul>
    </div>
  )
}
