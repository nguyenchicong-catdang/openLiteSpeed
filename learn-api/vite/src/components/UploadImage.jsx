import { useFetcher } from "react-router"

export default function UploadImage() {
   const fetcher = useFetcher();
   const handleUpload = (e) => {
      const file = e.target.files[0]
      if (!file) {
         return;
      }

      const formData = new FormData();
      formData.append('image', file);

      fetcher.submit(formData, {
         method: "POST",
         encType: "multipart/form-data", // de gui file
         action: 'upload/image'
      })
   }
  return (
     <div>
        <input type="file" onChange={handleUpload} accept="image/*" /><br />
        {fetcher.state === 'submitting' && <p>Dang tai anh len....</p>}
        {fetcher.data?.imageUrl && (
           <img src={fetcher.data.imageUrl} alt="Uploaded" width="200" />
        )}
    </div>
  )
}
