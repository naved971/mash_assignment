import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => {
  return {
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
        marginBottom: theme.spacing(2),
      },
  }
})
