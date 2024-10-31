"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import InputField from "@/components/InputField";
import { IconSearch, IconSparkles } from "@tabler/icons-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SideMenu from "@/components/SideMenu";

export default function Home() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  const [garmentId, setGarmentId] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [collections, setCollections] = useState([]);
  const [selectedCollection, setSelectedCollection] = useState("");
  const [newCollectionName, setNewCollectionName] = useState("");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    document.body.id = "home";

    axios.get("/api/collections")
      .then(({ data }) => setCollections([{ id: "default", name: "Default Collection" }, ...data]))
      .catch(console.error);
  }, []);

  function getResponse() {
    if (generating) return;

    const apiUrl = garmentId ? "/api/prompt/edit" : "/api/prompt";
    const body = { prompt, collectionId: selectedCollection || "default" };

    setGenerating(true);
    axios.post(apiUrl, body)
      .then(({ data }) => {
        setGarmentId(data.id);
        setImgSrc(data.url);
      })
      .catch(console.error)
      .finally(() => setGenerating(false));
  }

  function addCollection() {
    axios.post("/api/collections/add", { name: newCollectionName })
      .then(({ data }) => {
        setCollections([...collections, data]);
        setNewCollectionName("");
        setSelectedCollection(data.id);
      })
      .catch(console.error);
  }

  return (
    <>
      <Header title="Designer-App" onMenuClick={toggleMenu} />
      <div className="page-wrapper">
        <SideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
        
        <div className="page-content">
          <div className="mb-4">
            <label htmlFor="collection-select" className="block text-sm font-semibold mb-2">Choose Collection:</label>
            <select
              id="collection-select"
              className="border border-gray-300 rounded px-2 py-1"
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
            >
              {collections.map((collection) => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="New Collection Name"
              className="border border-gray-300 rounded px-2 py-1 w-full"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
            />
            <Button
              label="Add Collection"
              onClick={addCollection}
              disabled={!newCollectionName}
              className="mt-2"
            />
          </div>

          {imgSrc ? (
            <img className="garment-img" src={imgSrc} alt="Generated garment" />
          ) : (
            <div className="garment-img empty">No Image Yet...</div>
          )}

          <div className="prompt">
            <InputField
              textArea
              wrapText
              className="prompt-input"
              placeholder="Any ideas in mind?"
              iconLeft={<IconSearch />}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <Button
              tint="aquamarine"
              icon={<IconSparkles />}
              label="Generate"
              loading={generating}
              onClick={getResponse}
              xPad="0.7rem"
              yPad="0.35rem"
              disabled={!prompt}
            />
          </div>
        </div>
      </div>
    </>
  );
}
