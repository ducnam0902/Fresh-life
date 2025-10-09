import React from 'react';
import Title from '../../components/Title';
import { Button } from '@mui/material';

const Tasks: React.FC = () => {
  return <div>
      <Title title="Task Management" subTitle="Manage your daily tasks and track progress">
        <Button variant="contained" color="primary">Add New Task</Button>
      </Title>
    </div>;
};

export default Tasks;