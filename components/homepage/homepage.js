import { Fragment, useEffect, useState } from "react";
import { Menu, Popover, Transition } from "@headlessui/react";
import { useRouter } from 'next/router';

import {
  ChatBubbleLeftEllipsisIcon,
  CodeBracketIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  FlagIcon,
  HandThumbUpIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ShareIcon,
  StarIcon,
  
} from "@heroicons/react/20/solid";
import {
  ArrowTrendingUpIcon,
  Bars3Icon,
  BellIcon,
  FireIcon,
  HomeIcon,
  UserGroupIcon,
  XMarkIcon,
  InformationCircleIcon,
  ChatBubbleBottomCenterTextIcon,
  
} from "@heroicons/react/24/outline";

import { BsFillCaretDownFill as Downvote } from "react-icons/bs";
import { BsFillCaretUpFill as Upvote } from "react-icons/bs";

import { Button } from "@mui/material";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from "next/link";

const items = [
  { id: 1, title: 'Back End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 2, title: 'Front End Developer', department: 'Engineering', type: 'Full-time', location: 'Remote' },
  { id: 3, title: 'User Interface Designer', department: 'Design', type: 'Full-time', location: 'Remote' },
]
const user = {
  name: "Yeasir Arafat",
  email: "yeasir402@gmail.com",
  imageUrl:"/images/yeasir.jpg"
};
const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: true },
  { name: "Tags", href: "/tags", icon: ArrowTrendingUpIcon, current: false },
  { name: "Users", href: "/users", icon: UserGroupIcon, current: false },
  { name: "Contact", href: "/contact", icon: ChatBubbleBottomCenterTextIcon, current: false },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const communities = [
  { name: "React", href: "#" },
  { name: "Flutter", href: "#" },
  { name: "Next JS", href: "#" },
  { name: "Android", href: "#" },
  { name: "JavaScript", href: "#" },
  { name: "Java", href: "#" },
];

const quicklinks = [
  { name: "Facebook", href: "#" },
  { name: "Github", href: "#" },
  { name: "Twitter", href: "#" },
];
// const tabs = [
//   { name: "Recent", href: "#", current: true },
//   { name: "Most Viewed", href: "#", current: false }
// ];
const trendingPosts = [
  {
    id: 1,
    user: {
      name: "Yeasir Arafat",
      imageUrl:"/images/yeasir.jpg"
    },
    body: "How to cleanly make multiple elements movable anywhere?",
    comments: 291,
  },
  {
    id: 1,
    user: {
      name: "Yeasir Arafat",
      imageUrl:"/images/yeasir.jpg"
    },
    body: "How to cleanly make multiple elements movable anywhere?",
    comments: 291,
  },
  {
    id: 1,
    user: {
      name: "Yeasir Arafat",
      imageUrl: "/images/yeasir.jpg"
    },
    body: "How to cleanly make multiple elements movable anywhere?",
    comments: 291,
  },
  {
    id: 1,
    user: {
      name: "Yeasir Arafat",
      imageUrl: "/images/yeasir.jpg"
    },
    body: "How to cleanly make multiple elements movable anywhere?",
    comments: 291,
  },
  {
    id: 1,
    user: {
      name: "Yeasir Arafat",
      imageUrl: "/images/yeasir.jpg"
    },
    body: "How to cleanly make multiple elements movable anywhere?",
    comments: 291,
  },

  // More posts...
];
const whoToFollow = [
  {
    name: "Yeasir Arafat",
    handle: "yeasirar",
    href: "#",
    imageUrl:"/images/yeasir.jpg"  },
  {
    name: "Yeasir Arafat",
    handle: "yeasirar",
    href: "#",
    imageUrl:"/images/yeasir.jpg"  },
  {
    name: "Yeasir Arafat",
    handle: "yeasirar",
    href: "#",
    imageUrl:"/images/yeasir.jpg"  },
  // More people...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}


export default function HomePage({search}) {
  const router = useRouter();

  

  const [topUser,setTopUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      var sort_by = "reputation";
      const res = await fetch("/api/user/findall", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search: "",
          sortby: sort_by,
        }),
      });
      const data = await res.json();
      console.log(data);
      if(res.status === 200) {
        setTopUser(data);
      }
    };
    fetchData();
  }, []);

  const [tabs, setTabs] = useState([
    { name: "Newest", current: true },
    { name: "Most Rated", current: false }
  ])
  const changeTab = (index) => {
    const tempTabs = [...tabs];
    tempTabs.forEach((tab, i) => {
      if (i === index) {
        tab.current = true;
      } else {
        tab.current = false;
      }
    });
    setTabs(tempTabs);
  };
  const [agents, setagent] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      var sort_by = "recent";
      if(tabs[1].current) sort_by = "view";
      const res = await fetch("/api/shops/getshops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search: search,
          sortby: sort_by,
        }),
      });
      const data = await res.json();
      console.log(data);
      if(res.status === 200) {
        setagent(data);
      }
    };
    fetchData();
  }, [search,tabs]);
  const [trquestions, setTrQuestions] = useState(null);
  useEffect(() => {
    const fetchData = async () => {

      const res = await fetch("/api/question/get_question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search: "",
        }),
      });
      const data = await res.json();
      console.log(data);
      if(res.status === 200) {
        setTrQuestions(data);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className=" flex bg-indigo-600 min-h-full flex-col justify-between ">
        <div className="py-10">
          <div className=" mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
            
            <main className="mx-auto max-w-2xl lg:col-span-9 xl:col-span-12">
              <div className="px-4 sm:px-0">
                <div className="sm:hidden">
                  <label htmlFor="question-tabs" className="sr-only">
                    Select a tab
                  </label>
                  <select
                    id="question-tabs"
                    className="block w-full rounded-md border-gray-300 text-base font-medium text-gray-900 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                    defaultValue={tabs.find((tab) => tab.current).name}
                  >
                    {tabs.map((tab) => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                </div>
                <div className="hidden sm:block">
                  <nav
                    className="isolate flex divide-x divide-gray-200 rounded-lg shadow"
                    aria-label="Tabs"
                  >
                    {tabs.map((tab, tabIdx) => (
                      <a
                        key={tab.name}
                        href={tab.href}
                        onClick={() => changeTab(tabIdx)}
                        aria-current={tab.current ? "page" : undefined}
                        className={classNames(
                          tab.current
                            ? "text-gray-900"
                            : "text-gray-500 hover:text-gray-700",
                          tabIdx === 0 ? "rounded-l-lg" : "",
                          tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
                          "group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-6 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                        )}
                      >
                        <span>{tab.name}</span>
                        <span
                          aria-hidden="true"
                          className={classNames(
                            tab.current ? "bg-rose-500" : "bg-transparent",
                            "absolute inset-x-0 bottom-0 h-0.5"
                          )}
                        />
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
              <div className="mt-4">
                <h1 className="sr-only">Recent</h1>
                <ul role="list" className="space-y-4">
                  {agents && agents.map((shop) => (
                    <li
                      key={shop._id}
                      className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6"
                    >
                      <article
                        aria-labelledby={"Shop-title-" + shop._id}
                      >
                        <div>
                          <div className="mt-1 flex space-x-3">
                            <div className="flex-shrink-0">
                              <Image
                                className="h-10 w-10 rounded-full"
                                src={shop.imageUrl}
                                height={1000} width={1000}
                                alt=""
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-lg text-gray-900">
                                <a
                                  href={"/"}
                                  className="hover:underline"
                                >
                                  {shop.name}
                                </a>
                              </p>
                              <p className=" text-xs text-gray-500">
                                  {shop.city}
                              </p>
                              
                            </div>

                            <div className="pb-2 m-1 flex-shrink-0 self-center">
                            <span className="inline-flex items-center">
                            <StarIcon
                                  className="h-3 w-3 m-1 "
                                  aria-hidden="true"
                            />
                            <span className="font-medium text-sm text-gray-500">
                            {shop.rating}/5
                                </span>
                                </span>
                            </div>
                            
                          </div>
                          <p class="m-3 font-normal text-sm  text-gray-700 dark:text-gray-600"> <span className="pr-1 font-medium"> Location:</span>  {shop.address}</p>
                          <div className="mt-3 flex justify-between space-x-8">
                          <div class="flex items-center"> 
                           <p class="m-3 font-medium text-xs  text-gray-700 dark:text-gray-600" > Available services : </p>

                          {shop.services.map((service, index) => (
                           <span key={index} class="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-400 dark:text-gray-900" >{service}</span>
                           ))}  
                           </div>
                           <div className="flex text-sm">
                            <span className="inline-flex items-center text-sm">
                              <span className=" text-gray-900 font-semibold">
                              
                                <Button variant="outlined" size="small" onClick={() => {router.push({
                                      pathname: '/shop/',
                                      query: { email: shop.email}
                                  })}}>
                                  ORDER
                                </Button>
                                
                              </span>
                            </span>
                          </div>
                           </div>
                          
                        </div>
                        
                        

    

                        
                      </article>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-5 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              2
            </a>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </a>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
              ...
            </span>
            <a
              href="#"
              className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              8
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              9
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              10
            </a>
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
            </main>
            
          </div>
        </div>
      </div>

    </>
  );
}
