import React from 'react';
import { useStyles } from './styles'

interface CustomAvatarProps {
    src: string;
    alt: string;
}

const CustomAvatar = ({ src, alt }: CustomAvatarProps) => {
    const { classes } = useStyles()
    return <img src={src} alt={alt} className={classes.avatarImage} />;
};

export default CustomAvatar;