function bytesToSize(bytes: number): string {
  const sizes: string[] = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return `0 ${sizes[0]}`;

  const value: number = Math.floor(Math.log(bytes) / Math.log(1024));
  if (value === 0) return bytes + " " + sizes[value];
  return (bytes / Math.pow(1024, value)).toFixed(1) + " " + sizes[value];
}

export const handleFileUploadErrors = (error: string): string => {
  if (error.includes("bytes")) {
    const bytes: string = error.split("than")[1].trim().split(" ")[0];

    return `File is larger than ${bytesToSize(parseInt(bytes))}`;
  }

  return error;
};
