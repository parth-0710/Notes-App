import { useState } from "react";

import { Box, InputBase, Button, styled, Typography } from "@mui/material";
import { v4 as uuid } from 'uuid';

import { NoteObject } from "../models/note";
import { TITLE_LIMIT, DETAILS_LIMIT} from "../constants/constant";

const Container = styled(Box)`
    & > * {
        margin-right: 20px !important;
        margin: 20px 0;
    }
    & > div > input[type="text"] {
        border-bottom: 1px solid #111111;
        opacity: 0.4;
        width: 300px;
        padding-right: 25px;
    }
    & > div > input[type="color"] {
        position: relative;
        bottom: -10px;
        width: 40px;
        height: 30px;
    }
    & > span {
        font-size: 10px;
        position: relative;
        right: 40px;
    }
`;

const Error = styled(Typography)`
    background: red;
    color: #fff;
    padding: 10px;
    width: 50%;
`

const defaultObj = {
    id: 0, 
    title: '',
    details: '',
    color: '',
    date: (new Date().toLocaleString()).toString()
} // Date cannot be used directly as a React Child.

interface ICreateNoteProps {
    addNote: (note: NoteObject) => void
}

const CreateNote: React.FC<ICreateNoteProps> = ({ addNote }) => {

    const [note, setNote] = useState<NoteObject>(defaultObj);
    const [error, setError] = useState<string>('');

    const onValueChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if(error) 
            setError('');
        
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const onCreateNote = () => {
        if (!note.title && !note.details) {
            setError('All fields are mandatory');
            return;
        }

        addNote({ ...note, id: uuid() });
        setNote(defaultObj);
    }

    return (
        <Container>
            <InputBase 
                name="title" 
                value={note.title} 
                onChange={(e) => onValueChange(e)} 
                placeholder="Title" 
                inputProps={{
                    maxLength: TITLE_LIMIT
                }}
            />
            <Box component="span">{note.title.length}/{TITLE_LIMIT}</Box>
            <InputBase 
                name="details" 
                value={note.details} 
                onChange={(e) => onValueChange(e)} 
                placeholder="Details"
                inputProps={{
                    maxLength:DETAILS_LIMIT
                }}
            />
            <Box component="span">{note.details.length}/{DETAILS_LIMIT}</Box>
            <InputBase 
                type="color"
                name="color"
                defaultValue={'#F5F5F5'}
                onChange={(e) => onValueChange(e)} 
                placeholder="Choose color" 
            />
            <Button 
                variant="outlined"
                onClick={() => onCreateNote()}>
                    Create
            </Button>
            { error && <Error>{error}</Error> }
        </Container>
    )
}

export default CreateNote;