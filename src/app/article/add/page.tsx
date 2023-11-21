'use client'
import { Box, Button, FormControl, Grid, List, ListItem, TextField, useFormControl } from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { Label, SafetyDivider } from "@mui/icons-material";
import DragDropFileUpload from "@/shared/dnd-images";
import { Header } from "@/features/home/header";
export default function AddPage() {
    const handleFileUpload = (file: any) => {
        console.log(file);
    };

    return (
        <Grid container direction={'column'} rowSpacing={2}>
            <Grid item xs={16}>
                <Header />
            </Grid>
            <Grid item container xs={16} justifyContent={"center"}>
                <Grid item xs={8} >
                    <Box
                        component={"form"}
                    >
                        <List component="div" >

                            <ListItem>
                                <TextField

                                    id="article-title"
                                    label="Введите тему статьи"
                                    variant="filled"
                                    fullWidth
                                />

                            </ListItem>
                            <ListItem>
                                <TextField
                                    id="article-title"
                                    placeholder="Введите текст статьи"
                                    multiline
                                    rows={5}
                                    maxRows={Infinity}
                                />
                            </ListItem>

                        </List>


                        <DragDropFileUpload onFileUpload={handleFileUpload} />

                        <Button type="submit" variant="contained">Создать статью</Button>
                    </Box>
                </Grid>
            </Grid>

        </Grid>
    )
} 