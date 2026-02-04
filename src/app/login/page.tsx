import RegisterForm from '@/features/SignUp/RegisterForm'

export default function RegisterPage() {
  return (
    <div className=" flex items-center justify-center">
      <div className="w-full max-w-md ">
        <div className=" p-5 shadow-2xl flex-col flex items-center  border-primary gap-2 rounded-xl border px-4 py-2 ">
          <h1 className="text-2xl text-white">Регистрация</h1>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}