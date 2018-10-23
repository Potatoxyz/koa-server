var Handle={
  onError:(page)=>{
      page.on('error',(err)=>{
          console.log(err)
      })
  }
};
export default Handle;