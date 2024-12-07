import { Fragment } from 'react'
import React from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useAppContext } from './Context'

const navigation = [
  //{ name: 'DeFund', href: '#', current: true },
  { name: 'My Chits', href: '/', current: false },
  { name: 'Create', href: '/create', current: false },
  { name: 'Feed', href: '/feed', current: false },
  { name: 'About', href: '/about', current: false }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
  const { walletAddress, connectWallet } = useAppContext()
  return (
    <Disclosure as="nav" className="bg-[#f1f1f1] w-screen fixed top-0">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">

            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex
items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center
justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700
hover:text-white focus:outline-none focus:ring-2 focus:ring-inset
focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center
sm:items-stretch sm:justify-start">

                <div className="hidden sm:ml-6 sm:block">

                  <div className="flex space-x-6">
                    <Link to='/'><h1 className="text-2xl font-bold
text-blue-800">DeFund</h1></Link>
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' :
                            'text-gray-500 hover:bg-gray-300',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex
items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    {walletAddress ? <Menu.Button className="flex rounded-full
bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white
focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <p className='bg-slate-800 text-white rounded px-5 py-2'>{walletAddress}</p>
                    </Menu.Button> : <button onClick={() => { if (!walletAddress) { connectWallet() } else { console.log('connected') } }} className='bg-slate-800 text-white rounded px-5 py-2'>Connect</button>}
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2
w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1
ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ?
                              'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="#"
                            to='/analytics'
                            className={classNames(active ?
                              'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Analytics
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ?
                              'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Disconnect
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' :
                      'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}