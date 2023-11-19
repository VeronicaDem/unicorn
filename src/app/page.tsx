import { Article } from '@/features/home/article'
import { Header } from '@/features/home/header'
import { Grid } from '@mui/material'
import Image from 'next/image'
/**
 * Главная страница
 * Содержит ленту новостей блога
 * Доступна только авторизованному пользователю
 */
export default function Home() {
  return (
    <>

      <Grid container direction={'column'} rowSpacing={2}>
        <Grid item xs={16}>
          <Header />
        </Grid>
        <Grid item container xs={8} direction="row"
          justifyContent={"center"}>
          <Grid xs={8} container item direction="row"
            justifyContent={"space-between"} flexWrap={"wrap"}>
            <Article />
            <Article />
          </Grid>
        </Grid>

      </Grid>
    </>
  )
}
