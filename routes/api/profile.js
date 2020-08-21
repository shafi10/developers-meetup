const express = require('express')
const router = express.Router()
const request = require('request')
const config = require('config')

const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User')
const {check , validationResult} = require('express-validator/check')
const Post = require('../../models/Post')


router.get('/me',auth, async (req,res)=>{
    try {
       
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name','avatar'])
         if(!profile){
             return res.status(400).json({msg: 'there is no profile for this user'})
         }
         res.json(profile)
    } catch (error) {
       console.log(error) 
    }
})

router.post('/',[
   
    check('status','status can not empty').not().isEmpty(),
    check('skills','skills can not empty').not().isEmpty()
] ,auth, async(req,res)=>{
    const errors =validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()});
    }
    const {company,
    location, status
    ,skills
    ,youtube,linkedin
    } = req.body
    
    //build profile object
    const profileFields = {}

    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(location) profileFields.location = location;
    if(status) profileFields.status = status;
    if(skills) {
        profileFields.skills = skills.split(',').map(skill=> skill.trim())
    }

    profileFields.social = {}
    if(youtube) profileFields.social.youtube = youtube;
    if(linkedin) profileFields.social.linkedin = linkedin;

    try {
        let profile = await Profile.findOne({user: req.user.id})

        if(profile){
            profile =await Profile.findOneAndUpdate({user: req.user.id},{
                $set:profileFields
            },{new:true}
            )
            return res.json(profile)
        }
       profile = new Profile(profileFields)
        await profile.save()
        res.json(profile)
        
    } catch (error) {
        console.log(error)
    }
})


router.get('/', async(req,res)=>{
   try {
       const profiles = await Profile.find().populate('user', ['name', 'avatar'])
        res.json(profiles);
    } catch (error) {
       console.log(error)
   }
})

router.get('/user/:user_id', async(req,res)=>{
    try {
        const profiles = await Profile.findOne({user:req.params.user_id}).populate('user', ['name', 'avatar'])
         if(!profiles) return res.status(400).json({msg:'there is no profile'})
        res.json(profiles);
     } catch (error) {
        if(error.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Profile not found'})
        }
        res.status(500).send('Server error')
    }
 })

 router.delete('/',auth, async(req,res)=>{
    try {
        await Post.deleteMany({user:req.user.id})
        await Profile.findOneAndRemove({user:req.user.id})
        await User.findOneAndRemove({_id:req.user.id})
        res.json({msg:'profile and user deleted'});
     } catch (error) {
        if(error.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Profile not found'})
        }
        res.status(500).send('Server error')
    }
 })

 //update profile

router.put('/experience',auth, [
  check('title', 'title is required').not().isEmpty(),
  check('company', ' company is required').not().isEmpty()
], async (req,res)=>{
   const errors = validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
   }

   const {title,company}= req.body

    const newExp = {
        title,company
    }

    try {
        const profile = await Profile.findOne({user: req.user.id});

        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile)
    } catch (error) {
        console.log(error)
    }
})


//delete experience

router.delete('/experience/:exp_id',auth, async(req,res)=>{
   try {
    const profile = await Profile.findOne({user: req.user.id});

    //get remove index
    const removeIndex= profile.experience.map(item=> item.id).indexOf(req.params.exp_id)
    profile.experience.splice(removeIndex, 1)
    await profile.save()
    res.json(profile)
} catch (error) {
       console.log(error)
   }
})

//add education
router.put('/education',auth, [
    check('school', 'school is required').not().isEmpty(),
    check('degree', ' company is required').not().isEmpty()
  ], async (req,res)=>{
     const errors = validationResult(req);
     if(!errors.isEmpty()){
         return res.status(400).json({errors:errors.array()})
     }
  
     const {school,degree}= req.body
  
      const newEdu = {
        school,degree
      }
  
      try {
          const profile = await Profile.findOne({user: req.user.id});
  
          profile.education.unshift(newEdu);
          await profile.save();
          res.json(profile)
      } catch (error) {
          console.log(error)
      }
  })
  
  
  //delete experience
  
  router.delete('/education/:edu_id',auth, async(req,res)=>{
     try {
      const profile = await Profile.findOne({user: req.user.id});
  
      //get remove index
      const removeIndex= profile.education.map(item=> item.id).indexOf(req.params.exp_id)
      profile.education.splice(removeIndex, 1)
      await profile.save()
      res.json(profile)
  } catch (error) {
         console.log(error)
     }
  })

module.exports = router