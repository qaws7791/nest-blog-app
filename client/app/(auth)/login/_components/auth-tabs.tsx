import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserLoginForm } from './user-login-form'
import { UserRegisterForm } from './user-register-form'

const AuthTabs = () => {
  return (
    <Tabs defaultValue='login' className=''>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='login'>Login</TabsTrigger>
        <TabsTrigger value='register'>Register</TabsTrigger>
      </TabsList>
      <TabsContent value='login'>
        <UserLoginForm />
      </TabsContent>
      <TabsContent value='register'>
        <UserRegisterForm />
      </TabsContent>
    </Tabs>
  )
}

export default AuthTabs
