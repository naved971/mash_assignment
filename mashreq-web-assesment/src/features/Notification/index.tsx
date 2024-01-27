import React, {useState, useEffect} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { fetchPushMessagesToken, onMessageListener } from '../../firebase';
import { Card, CardContent, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => {
  return {
    notificationCard: {
      minWidth: 200,
      margin: theme.spacing(2),
      padding: theme.spacing(2),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    title: {
      fontWeight: 'bold',
      marginBottom: theme.spacing(1),
    },
    body: {
      marginBottom: theme.spacing(1),
    },
  }
})

// Notification component to handle web push by google cloud messaging.
const Notification = () => {
  const { classes } = useStyles()

    const [notification, setNotification] = useState<any>({title: '', body: ''});

    useEffect(() => {
        fetchPushMessagesToken()
    }, [])

    onMessageListener().then(payload => {
        setNotification({title: payload.notification.title, body: payload.notification.body});
    }).catch(err => console.log('failed: ', err));

    const notify = () =>  toast(<ToastDisplay/>);

    const ToastDisplay = () => {
      return (
        <Card className={classes.notificationCard}>
        <CardContent>
          <Typography variant="h6" className={classes.title}>
            {notification?.title}
          </Typography>
          <Typography variant="body1" className={classes.body}>
            {notification?.body}
          </Typography>
        </CardContent>
      </Card>
      );
    };

    useEffect(() => {
        if (notification?.title) {
            notify()
        }
    }, [notification])

    return (
        <Toaster/>
    )
}

export default Notification