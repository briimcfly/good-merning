import {useState} from 'react';
import {useMutation} from '@apollo/client';
import {ADD_USER} from '../utils/mutations';
import Auth from '../utils/auth';

const Signup = ({isOpen, onClose}) => {
    //state to manage form data and errors
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [addUser, {error}] = useMutation(ADD_USER);

    //handle input changes
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormState({
            ...formState, [name]: value,
        });
    }

    
