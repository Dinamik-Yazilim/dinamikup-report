import Link from "next/link"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Separator } from '@/components/ui/separator'
import HorizontalLineWithText from '@/components/horizontal-line-with-text'
import ThemeToggleButton from '@/components/theme-toggle-button'
import { HeaderLogo2 } from '@/components/logo'
import MagicLinkSignIn from '../(components)/magic-link-signin'
import EmailPasswordSignIn from '../(components)/email-password-signin'
import SSOSignIn from '../(components)/sso-signin'
import { toast } from "sonner"



const LoginPage = () => {


  return (<div className='grid grid-cols-1 md:grid-cols-2'>
    <div className="hidden h-full  lg:flex flex-row justify-center  items-center">
      <AppIntroduce />

    </div>
    <div className=' h-full flex items-center justify-center w-full mt-0 md:mt-0'>

      <div className="w-full  mb-6 text-2xl max-w-[450px] space-y-4">
        <div className='flex flex-col mb-4'>

          <div className='rounded-lg border border-dashed border-opacity-50 border-slate-400 p-4 space-y-4'>
            <Label >Magic Link</Label>
            <MagicLinkSignIn redirectUrl='/auth/login/checkEmail' />
          </div>
        </div>
        <HorizontalLineWithText className='w-full' text='veya' />

        <div className='flex flex-col mb-4'>
          <div className='grid grid-cols-2  rounded-lg border border-dashed border-opacity-50 border-slate-400 p-4 '>
            <SSOSignIn className='w-full flex justify-center items-center' provider='google' variant={'outline'}>
              <i className="text-xl fa-brands fa-google me-2"></i>
              Google
            </SSOSignIn>
            <SSOSignIn className='w-full flex justify-center items-center' provider='github' variant={'outline'}>
              <i className="text-xl fa-brands fa-github me-2"></i>
              Github
            </SSOSignIn>

            <SSOSignIn className='w-full flex justify-center items-center ' provider='yandex' variant={'outline'}>
              <i className="text-xl fa-brands fa-yandex me-2"></i>
              Yandex
            </SSOSignIn>

          </div>
        </div>
        <HorizontalLineWithText className='w-full' text='veya' />
        <div className='flex flex-col mb-4'>

          <div className='rounded-lg border border-dashed border-opacity-50 border-slate-400 p-4 space-y-4'>
            <Label >Email</Label>
            <EmailPasswordSignIn />

            <p className="w-full mt-6 text-start text-sm text-muted-foreground ">
              Hesabınız yok mu?
              <Link
                href="/auth/register"
                className="underline underline-offset-4 hover:text-primary ms-2"
              >
                Kayıt olun
              </Link>
            </p>
          </div>
        </div>
        <p className="w-full mt-6 text-center text-xs text-muted-foreground ">
          Devam'ı tıklayarak,{" "}
          <Link
            href="#"  // qwerty terms, privacy, dpa, etc
            className="underline underline-offset-4 hover:text-primary"
          >
            Hizmet Şartlarımızı
          </Link>{" "}
          ve{" "}
          <Link
            href="#"  // qwerty terms, privacy, dpa, etc
            className="underline underline-offset-4 hover:text-primary"
          >
            Gizlilik Politikamızı
          </Link>
          {" "}kabul etmiş olursunuz
        </p>


      </div>
    </div>
  </div>)
}

function AppIntroduce() {
  return (
    <div className="w-full flex justify-between items-center text-lg font-medium px-8">
      <div className='flex flex-col gap-4 mx-8'>
        <h2 className='text-4xl'>DinamikUp</h2>
        <h3 className='text-2xl'>İş Raporlamasında Yeni Dönem</h3>

        <p className='text-base'>
          Günümüzün hızlı iş dünyasında, doğru verilere hızla ulaşmak, bilinçli kararlar almak için hayati önem taşır. İşte bu yüzden, <b>DinamikUp</b>'yi geliştirdik! Tüm iş raporlama ihtiyaçlarınızı karşılayan bu uygulama, rekabetin bir adım önünde olmanıza yardımcı olacak.
        </p>
        <h2 className='text-2xl'><b>DinamikUp</b> ile:</h2>
        <ul className='list-disc'>
          <li>Detaylı raporlar oluşturun: Satışlar, harcamalar, çalışan verimliliği ve daha fazlası.</li>
          <li>Her yerden verilerinize erişin.</li>
          <li>Raporlama süreçlerini otomatikleştirin, zamandan tasarruf edin ve işinizi büyütmeye odaklanın.</li>
          <li>Raporlarınızı ekibinizle paylaşın.</li>
        </ul>
        <p>Kullanıcı dostu arayüzümüz, karmaşık kurulumlar gerektirmeden raporlar oluşturmanızı kolaylaştırır.</p>
        <p><b>DinamikUp</b>'yi bugün kullanmaya başlayın ve iş raporlarınızı yönetme şeklinizi dönüştürün!</p>
        <div className='flex flex-col'>
          <div>ConnectorAbi Download Link</div>
          <Link
            className='text-blue-500'
            href={'https://github.com/connectorabi/client/blob/main/installer/win64/connectorabi-setup.zip'}>
            connectorabi-setup.zip
          </Link>
        </div>
      </div>
      <Separator
        className='h-[75vh] w-0.5 bg-slate-500'
        orientation='vertical'
      />
    </div>
  )
}
export default LoginPage