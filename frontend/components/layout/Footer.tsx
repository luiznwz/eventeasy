"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  CalendarIcon,
  ChevronDown,
  ChevronUp,
  Github,
  Mail,
  X,
} from "lucide-react";
import { Link } from "next-view-transitions";
import { useState } from "react";

export default function Footer() {
  const [openDevelopers, setOpenDevelopers] = useState(false);
  const [openResources, setOpenResources] = useState(false);
  const [openCompany, setOpenCompany] = useState(false);

  return (
    <footer className="max-w-7xl mx-auto border-t border-gray-200 bg-white py-12 sm:py-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="hidden md:block">
            <Link href="/" className="inline-block">
              <CalendarIcon className="h-6 w-6 text-gray-500" />
            </Link>
          </div>

          <div className="hidden md:flex space-x-16">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Developers
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/institucional/team"
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Nossa Equipe
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/programdores-sem-patria"
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Resources
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/institucional/saiba-mais"
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Saiba mais
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/contact"
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    X (Twitter)
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Mobile layout */}
          <div className="flex flex-col w-full md:hidden">
            <div className="flex justify-center mb-8">
              <Link href="/" className="inline-block">
                <CalendarIcon className="h-6 w-6 text-gray-500" />
              </Link>
            </div>

            <div className="flex flex-col space-y-4 w-full">
              {/* Developers Dropdown */}
              <Collapsible
                open={openDevelopers}
                onOpenChange={setOpenDevelopers}
                className="w-full  rounded-md overflow-hidden"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3">
                  <h3 className="text-sm font-medium text-gray-900">
                    Developers
                  </h3>
                  {openDevelopers ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-3">
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/institucional/team"
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        Nossa Equipe
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://github.com/"
                        className="text-sm text-gray-500 hover:text-gray-700 block"
                      >
                        GitHub
                      </Link>
                    </li>
                  </ul>
                </CollapsibleContent>
              </Collapsible>

              {/* Resources Dropdown */}
              <Collapsible
                open={openResources}
                onOpenChange={setOpenResources}
                className="w-full rounded-md overflow-hidden"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3">
                  <h3 className="text-sm font-medium text-gray-900">
                    Resources
                  </h3>
                  {openResources ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-3">
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/"
                        className="text-sm text-gray-500 hover:text-gray-700 block"
                      >
                        Changelog
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/"
                        className="text-sm text-gray-500 hover:text-gray-700 block"
                      >
                        Blog
                      </Link>
                    </li>
                  </ul>
                </CollapsibleContent>
              </Collapsible>

              {/* Company Dropdown */}
              <Collapsible
                open={openCompany}
                onOpenChange={setOpenCompany}
                className="w-full rounded-md overflow-hidden"
              >
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3">
                  <h3 className="text-sm font-medium text-gray-900">Company</h3>
                  {openCompany ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </CollapsibleTrigger>
                <CollapsibleContent className="p-3">
                  <ul className="space-y-2">
                    <li>
                      <Link
                        href="/"
                        className="text-sm text-gray-500 hover:text-gray-700 block"
                      >
                        Contact
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/"
                        className="text-sm text-gray-500 hover:text-gray-700 block"
                      >
                        X (Twitter)
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/legal"
                        className="text-sm text-gray-500 hover:text-gray-700 block"
                      >
                        Legal
                      </Link>
                    </li>
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>

          <div className="mt-8 sm:mt-0 md:flex justify-between items-center hidden">
            <div className="flex space-x-4">
              <Link
                href="https://github.com/"
                className="text-gray-400 hover:text-gray-600"
              >
                <Github size={16} />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </Link>
              <Link href="/" className="text-gray-400 hover:text-gray-600">
                <Mail size={16} />
              </Link>
            </div>
          </div>

          {/* Mobile footer bottom */}
          <div className="mt-8 flex flex-col items-center space-y-4 md:hidden w-full">
            <div className="flex space-x-4">
              <Link
                href="https://github.com/"
                className="text-gray-400 hover:text-gray-600"
              >
                <Github size={16} />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </Link>
              <Link href="/" className="text-gray-400 hover:text-gray-600">
                <Mail size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
