"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import JsonDataa from "./json-data";
import AddJson from "./add-json";
import { useState } from "react";
export default function JsonEditor(){
    const [refreshKey, setRefreshKey] = useState(0);
    const handleSave = async (jsonName: string, jsonData: string) => {
    const response = await fetch('/api/json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: jsonName, content: jsonData }),
    });
    console.log('resp: ',response);

    if (response.ok) {
      setRefreshKey((prev) => prev + 1);
      console.log('data successfully added');
    } else {
      console.log('something went wrong!');
    }
  };
    return (
        <Card>
            <CardHeader>
                <CardTitle>Saved JSON Data</CardTitle>
                <CardDescription>View and share your saved JSON data.</CardDescription>
            </CardHeader>
            <CardContent>
                <JsonDataa key={refreshKey} />
            </CardContent>
            <CardFooter>
                <AddJson onSave={handleSave} />
            </CardFooter>
        </Card>
    );
}