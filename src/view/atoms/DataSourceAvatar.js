import Avatar from "@mui/material/Avatar";
const IMAGE_DIM = 20;
export default function DataSourceAvatar({ dataSource }) {
  return (
    <Avatar
      src={process.env.PUBLIC_URL + `/${dataSource.id}.png`}
      alt={dataSource.name}
      sx={{ width: IMAGE_DIM, height: IMAGE_DIM }}
    />
  );
}
