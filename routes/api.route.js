const { PrismaClient } = require('@prisma/client');
const prisma= new PrismaClient()
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  res.send({ message: 'Ok api is working 🚀' });
});

// router.get('/register', async(req,res)=>{
//   try {
//     const user= await prisma.users.
//   } catch (error) {
    
//   }
 
// })

router.post('/insert',async(req,res)=>{
  const{name,email,password}=req.body
const data= await prisma.users.create({
  data:{name,email,password}
})
res.send(data)
})

router.get('/read',async(req,res)=>{
  const {email,password}=req.body
  const data = await prisma.users.findUnique({
    where:{
      email
    }
  })
  if(data==null){
    res.send('not exit')
  }else{
  res.send(data)
  }
})

router.get('/readm',async(req,res)=>{
  const {email,password}=req.body
  try {
    const data = await prisma.users.findMany({
      where:{
        email,password
      }
    })
    res.send(data)
  } catch (error) {
    res.send(err)
    
  }
})
router.get('/readall',async(req,res)=>{
  const data= await prisma.users.findMany()
  res.send(data)
})

router.get('/update',async(req,res)=>{
  const{email,name,password}=req.body
  let data = await prisma.users.update({
    where:{email:email},
    data:{name,email,password}
  })
  res.send(data)
})

router.get('/delete',async(req,res)=>{
  const{email}=req.body
  let data=await prisma.users.delete({
    where:{email}
  })
  res.send("deleted")
})

module.exports = router;
