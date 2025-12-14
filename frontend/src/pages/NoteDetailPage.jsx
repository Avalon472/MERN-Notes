import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router"
import api from "../lib/axios"
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react"
import toast from "react-hot-toast"

const NoteDetailPage = () => {
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate()
  const {id} = useParams()

  useEffect(() => {
    const fetchNote = async() => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        if(error.response.status === 429){
          toast.error("Too many requests. Please try again in a few seconds")
        }
        else{
        toast.error("Failed to fetch specified note")
        }

        console.log("Error in fetching note", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [id])

  const handleDelete = async(e) => {
        e.preventDefault()

        if (!window.confirm("Are you sure you want to delete this note?")){
            return
        }

        try {
            await api.delete(`/notes/${id}`)
            toast.success("Note has been deleted")
            navigate("/")
        } catch (error) {
            toast.error("Failed to note")
            console.log("Error in deleting note", error)
        }
  }

   const handleSave = async() => {
    if(!note.title.trim() || !note.content.trim()){
      toast.error("Please fill out both fields")
      return
    }

    setSaving(true)

    try {
      await api.put(`/notes/${id}`, note)
      toast.success("Note successfully updated")

    } catch (error) {
      toast.error("Error in updating note")
      console.log("Error in updating note" , error)
    } finally {
      setSaving(false)
    }

  }

  if(loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-primary" />
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="size-5"/>
              Back to Homepage
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="size-5"/>
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input 
                type="text"
                placeholder="Note Title"
                className="input input-bordered"
                value={note.title}
                onChange={(e) => setNote({...note, title: e.target.value})}
                />
                </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea 
                placeholder="Note Content"
                className="textarea textarea-bordered h-32"
                value={note.content}
                onChange={(e) => setNote({...note, content: e.target.value})}
                />

              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving Note..." : "Save Changes"}
                </button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage
