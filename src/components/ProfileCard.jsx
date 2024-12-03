import { Card, CardContent, Typography } from '@mui/material';

function ProfileCard({ name, profession, rating, contact }) {
  return (
    <Card sx={{ maxWidth: 345, m: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {profession}
        </Typography>
        <Typography variant="body2">
          Rating: {rating}
          <br />
          Contact: {contact}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
