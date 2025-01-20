"use client";
import React from "react";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "./button";
import { useActionState } from "react";
import { lusitana } from "./fonts";
import { register } from "../lib/actions";
const AdminForm = () => {
  const [errorMessage, formAction, isPending] = useActionState(
    register,
    undefined
  );
  return (
    <form
      action={formAction}
      className="max-w-md mx-auto space-y-6 bg-white shadow-lg rounded-lg p-8"
    >
      <h1 className={`${lusitana.className} text-2xl font-bold text-gray-800`}>
        Create the Admin Account
      </h1>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <div className="relative mt-1">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter your Name"
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <UserCircleIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <div className="relative mt-1">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            required
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <AtSymbolIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <div className="relative mt-1">
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            required
            minLength={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <KeyIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <Button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500">
        Log in
      </Button>

      {errorMessage && (
        <div className="mt-4 flex items-center text-sm text-red-600">
          <ExclamationCircleIcon className="h-5 w-5 mr-2" />
          {errorMessage}
        </div>
      )}
    </form>
  );
};

export default AdminForm;
