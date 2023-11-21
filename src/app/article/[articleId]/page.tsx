'use client'
import Slider from "@/features/article-page/slider";
import { Header } from "@/features/home/header";
import { Grid, Typography, styled } from "@mui/material";
import { useParams } from "next/navigation"
import Carousel from "react-material-ui-carousel";
/**
 * Страница с определенной статьей
 * Доступна авторизованному пользователю
 */
export default function ArticlePage(props: any) {
    const { articleId } = useParams();
    return (
        <>
            <Grid container direction={'column'} rowSpacing={2}>
                <Grid item xs={16}>
                    <Header />
                </Grid>

                <Grid item container xs={8}
                    justifyContent={"center"}>
                    <Slider img={[
                        {
                            src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2",
                            alt: "first"
                        },
                        {
                            src: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
                            alt: "second"
                        }
                    ]} />
                </Grid>


                <Grid item container xs={8}
                    justifyContent={"center"} alignItems={"baseline"}>

                    <Typography variant="h1">Title</Typography>


                </Grid>
                <Grid item gap={4} container xs={8} justifyContent={
                    "center"}>
                    <Typography variant="h2">Author</Typography>
                    <Grid item xs={6}>
                        <Typography variant="body1" whiteSpace={"pre-wrap"}>
                            consectetur adipisicing elit. Distinctio amet pariatur cupiditate ullam, cumque magni dolorum, deleniti aperiam temporibus quas corrupti, consectetur eligendi.
                            consectetur adipisicing elit. Distinctio amet pariatur cupiditate ullam, cumque magni dolorum, deleniti aperiam temporibus quas corrupti, consectetur eligendi.
                        </Typography>
                    </Grid>

                </Grid>
            </Grid>

        </>
    )
}



