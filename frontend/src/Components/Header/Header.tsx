import logo from '../../assets/Talviewlogo.png'

export const Header = () => {
  const handleLogoClick = () => {
    window.open('https://google.com', '_blank')
  }

  return (
    <>
      <div className='bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16 sm:h-18 md:h-20'>
            <div className='flex items-center'>
              <img
                src={logo}
                alt='Talview Logo'
                className='h-10 sm:h-12 md:h-14 lg:h-16 w-auto cursor-pointer hover:opacity-80 transition-opacity duration-200 py-2'
                onClick={handleLogoClick}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}