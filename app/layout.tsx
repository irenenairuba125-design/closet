export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' rel='stylesheet'/>
      </head>
      <body style={{margin:0}}>{children}</body>
    </html>
  )
}