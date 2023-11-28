// const writeBooks = () => {

//     conn.query('SELECT * FROM buku', (err, rows) => {     
//       if(err) throw err;
//       console.log('Data received from Db:');
//       bookDatas.push(...rows);
//       fs.writeFileSync("./books.json", JSON.stringify(bookDatas, null, 2));
//     });
//   };

// conn.query('SELECT * FROM buku', (err, rows) => {  
    //   if(err) throw err;
    
    //   console.log('Data received from Db:');
    //   bookDatas = rows.map((row) => {
    //     return {...row};
    //   });
    // });