import SingleItemContainer from '@/components/common/SingleItemContainer';
import { useRouter } from 'expo-router';
import React from 'react';

const index = () => {

    const router = useRouter();
  return (
    <SingleItemContainer/>
  )
}

export default index;